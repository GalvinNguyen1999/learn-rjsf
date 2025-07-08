'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Button, 
  useToast,
  Grid,
  GridItem,
  Input,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Switch,
} from '@chakra-ui/react';
import { FiSettings, FiEye, FiCode, FiSave } from 'react-icons/fi';
import FormRenderer from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';
import { RJSFSchema } from '@rjsf/utils';
import SortableFormField from '../components/SortableFormField';
import FieldPalette from '../components/FieldPalette';
import PropertiesPanel from '../components/PropertiesPanel';

export interface FormField {
  id: string;
  type: string;
  label: string;
  schema: RJSFSchema;
  uiSchema?: Record<string, unknown>;
  properties?: Record<string, unknown>;
}

export interface FormSettings {
  title: string;
  description: string;
  submitText: string;
  showReset: boolean;
  resetText: string;
}

const FormBuilder: React.FC = () => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [formSettings, setFormSettings] = useState<FormSettings>({
    title: 'My Form',
    description: 'This is a form built with Form Builder',
    submitText: 'Submit',
    showReset: false,
    resetText: 'Reset',
  });
  const [showSchema, setShowSchema] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setFormFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addField = (fieldType: string) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: fieldType,
      label: `Field ${formFields.length + 1}`,
      schema: getFieldSchema(fieldType),
      uiSchema: getFieldUISchema(fieldType),
      properties: getFieldProperties(fieldType),
    };

    setFormFields([...formFields, newField]);
    setSelectedField(newField);
    toast({
      title: 'Field added',
      description: `${fieldType} field has been added to the form`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const removeField = (fieldId: string) => {
    setFormFields(formFields.filter((field) => field.id !== fieldId));
    if (selectedField?.id === fieldId) {
      setSelectedField(null);
    }
    toast({
      title: 'Field removed',
      description: 'Field has been removed from the form',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setFormFields(
      formFields.map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    );
    
    if (selectedField?.id === fieldId) {
      setSelectedField({ ...selectedField, ...updates });
    }
  };

  const generateSchema = (): RJSFSchema => {
    const properties: Record<string, unknown> = {};
    const required: string[] = [];

    formFields.forEach((field) => {
      properties[field.label] = field.schema;
      if (field.schema.required) {
        required.push(field.label);
      }
    });

    return {
      type: 'object',
      title: formSettings.title,
      description: formSettings.description,
      properties: properties as Record<string, RJSFSchema>,
      required,
    };
  };

  const generateUISchema = () => {
    const uiSchema: Record<string, unknown> = {};

    formFields.forEach((field) => {
      if (field.uiSchema) {
        uiSchema[field.label] = field.uiSchema;
      }
    });

    return uiSchema;
  };

  const handleFormSubmit = (formData: unknown) => {
    console.log('Form submitted:', formData);
    toast({
      title: 'Form submitted',
      description: 'Form data has been submitted successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSaveForm = () => {
    const formData = {
      settings: formSettings,
      schema: generateSchema(),
      uiSchema: generateUISchema(),
      fields: formFields,
    };
    
    console.log('Form saved:', formData);
    toast({
      title: 'Form saved',
      description: 'Form configuration has been saved',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box h="100vh" bg="gray.50">
      {/* Header */}
      <Box bg="white" borderBottom="1px" borderColor="gray.200" px={6} py={4}>
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="xl" fontWeight="bold" color="gray.800">
              Form Builder
            </Text>
            <Text fontSize="sm" color="gray.500">
              Build beautiful forms with drag and drop
            </Text>
          </VStack>
          
          <HStack spacing={3}>
            <Button
              leftIcon={<FiSettings />}
              variant="outline"
              onClick={onOpen}
            >
              Form Settings
            </Button>
            <Button
              leftIcon={<FiEye />}
              colorScheme={previewMode ? 'blue' : 'gray'}
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? 'Edit Mode' : 'Preview'}
            </Button>
            <Button
              leftIcon={<FiCode />}
              variant="outline"
              onClick={() => setShowSchema(!showSchema)}
            >
              Schema
            </Button>
            <Button
              leftIcon={<FiSave />}
              colorScheme="green"
              onClick={handleSaveForm}
            >
              Save Form
            </Button>
          </HStack>
        </HStack>
      </Box>

      {/* Main Content */}
      <Grid templateColumns={showSchema ? "300px 1fr 300px" : "300px 1fr"} h="calc(100vh - 80px)">
        {/* Left Sidebar - Field Palette */}
        <GridItem bg="white" borderRight="1px" borderColor="gray.200" p={4}>
          <FieldPalette onAddField={addField} />
        </GridItem>

        {/* Center - Form Builder */}
        <GridItem p={6} overflowY="auto">
          {previewMode ? (
            <Box bg="white" p={8} borderRadius="lg" shadow="sm" maxW="800px" mx="auto">
              <FormRenderer
                schema={generateSchema()}
                uiSchema={generateUISchema()}
                validator={validator}
                onSubmit={({ formData }) => handleFormSubmit(formData)}
                showErrorList={false}
              />
            </Box>
          ) : (
            <Box bg="white" p={6} borderRadius="lg" shadow="sm" minH="600px">
              {formFields.length === 0 ? (
                <VStack spacing={6} py={20}>
                  <Box textAlign="center">
                    <Text fontSize="2xl" fontWeight="bold" color="gray.400" mb={2}>
                      Start Building Your Form
                    </Text>
                    <Text color="gray.500" fontSize="lg">
                      Drag fields from the left panel to create your form
                    </Text>
                  </Box>
                </VStack>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={formFields.map((field) => field.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <VStack spacing={4} align="stretch">
                      {formFields.map((field) => (
                        <SortableFormField
                          key={field.id}
                          field={field}
                          isSelected={selectedField?.id === field.id}
                          onSelect={() => setSelectedField(field)}
                          onRemove={removeField}
                          onUpdate={updateField}
                        />
                      ))}
                    </VStack>
                  </SortableContext>
                </DndContext>
              )}
            </Box>
          )}
        </GridItem>

        {/* Right Sidebar - Properties Panel */}
        {!showSchema && (
          <GridItem bg="white" borderLeft="1px" borderColor="gray.200" p={4}>
            <PropertiesPanel
              selectedField={selectedField}
              onUpdateField={updateField}
              formSettings={formSettings}
              onUpdateSettings={setFormSettings}
            />
          </GridItem>
        )}

        {/* Schema Panel */}
        {showSchema && (
          <GridItem bg="white" borderLeft="1px" borderColor="gray.200" p={4}>
            <VStack align="stretch" spacing={4}>
              <Text fontSize="lg" fontWeight="semibold">
                Generated Schema
              </Text>
              <Box
                bg="gray.50"
                p={4}
                borderRadius="md"
                fontSize="sm"
                fontFamily="mono"
                overflowX="auto"
              >
                <pre>{JSON.stringify(generateSchema(), null, 2)}</pre>
              </Box>
              
              <Text fontSize="lg" fontWeight="semibold">
                UI Schema
              </Text>
              <Box
                bg="gray.50"
                p={4}
                borderRadius="md"
                fontSize="sm"
                fontFamily="mono"
                overflowX="auto"
              >
                <pre>{JSON.stringify(generateUISchema(), null, 2)}</pre>
              </Box>
            </VStack>
          </GridItem>
        )}
      </Grid>

      {/* Form Settings Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Form Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Form Title</FormLabel>
                <Input
                  value={formSettings.title}
                  onChange={(e) => setFormSettings({ ...formSettings, title: e.target.value })}
                  placeholder="Enter form title"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={formSettings.description}
                  onChange={(e) => setFormSettings({ ...formSettings, description: e.target.value })}
                  placeholder="Enter form description"
                  rows={3}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Submit Button Text</FormLabel>
                <Input
                  value={formSettings.submitText}
                  onChange={(e) => setFormSettings({ ...formSettings, submitText: e.target.value })}
                  placeholder="Submit"
                />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show Reset Button</FormLabel>
                <Switch
                  isChecked={formSettings.showReset}
                  onChange={(e) => setFormSettings({ ...formSettings, showReset: e.target.checked })}
                />
              </FormControl>
              
              {formSettings.showReset && (
                <FormControl>
                  <FormLabel>Reset Button Text</FormLabel>
                  <Input
                    value={formSettings.resetText}
                    onChange={(e) => setFormSettings({ ...formSettings, resetText: e.target.value })}
                    placeholder="Reset"
                  />
                </FormControl>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

// Helper functions to generate schema and UI schema for different field types
const getFieldSchema = (fieldType: string): RJSFSchema => {
  switch (fieldType) {
    case 'text':
      return { type: 'string', title: 'Text Input' };
    case 'email':
      return { type: 'string', title: 'Email', format: 'email' };
    case 'number':
      return { type: 'number', title: 'Number' };
    case 'textarea':
      return { type: 'string', title: 'Text Area' };
    case 'select':
      return {
        type: 'string',
        title: 'Select',
        enum: ['Option 1', 'Option 2', 'Option 3'],
        enumNames: ['Option 1', 'Option 2', 'Option 3'],
      };
    case 'checkbox':
      return { type: 'boolean', title: 'Checkbox' };
    case 'radio':
      return {
        type: 'string',
        title: 'Radio',
        enum: ['Option 1', 'Option 2', 'Option 3'],
        enumNames: ['Option 1', 'Option 2', 'Option 3'],
      };
    case 'date':
      return { type: 'string', title: 'Date', format: 'date' };
    case 'datetime':
      return { type: 'string', title: 'Date & Time', format: 'date-time' };
    case 'url':
      return { type: 'string', title: 'URL', format: 'uri' };
    case 'phone':
      return { type: 'string', title: 'Phone Number' };
    case 'password':
      return { type: 'string', title: 'Password' };
    case 'file':
      return { type: 'string', title: 'File Upload', format: 'data-url' };
    case 'image':
      return { type: 'string', title: 'Image Upload', format: 'data-url' };
    case 'address':
      return { type: 'string', title: 'Address' };
    case 'creditcard':
      return { type: 'string', title: 'Credit Card' };
    default:
      return { type: 'string', title: 'Text Input' };
  }
};

const getFieldUISchema = (fieldType: string): Record<string, unknown> => {
  switch (fieldType) {
    case 'textarea':
      return { 'ui:widget': 'textarea' };
    case 'radio':
      return { 'ui:widget': 'radio' };
    case 'date':
      return { 'ui:widget': 'date' };
    case 'datetime':
      return { 'ui:widget': 'datetime-local' };
    case 'password':
      return { 'ui:widget': 'password' };
    case 'file':
      return { 'ui:widget': 'file' };
    case 'image':
      return { 'ui:widget': 'file', 'ui:options': { accept: 'image/*' } };
    case 'address':
      return { 'ui:widget': 'textarea' };
    case 'creditcard':
      return { 'ui:widget': 'text', 'ui:options': { pattern: '[0-9\\s-]+' } };
    default:
      return {};
  }
};

const getFieldProperties = (fieldType: string): Record<string, unknown> => {
  const baseProps = {
    required: false,
    placeholder: '',
    helpText: '',
  };

  switch (fieldType) {
    case 'text':
    case 'email':
    case 'number':
    case 'textarea':
    case 'url':
    case 'phone':
    case 'password':
      return {
        ...baseProps,
        minLength: fieldType === 'text' || fieldType === 'textarea' ? 0 : undefined,
        maxLength: fieldType === 'text' || fieldType === 'textarea' ? 100 : undefined,
        pattern: fieldType === 'email' ? '^[^@]+@[^@]+\\.[^@]+$' : undefined,
      };
    case 'select':
    case 'radio':
      return {
        ...baseProps,
        options: ['Option 1', 'Option 2', 'Option 3'],
      };
    case 'checkbox':
      return {
        ...baseProps,
        defaultChecked: false,
      };
    case 'date':
    case 'datetime':
      return {
        ...baseProps,
        minDate: undefined,
        maxDate: undefined,
      };
    case 'file':
    case 'image':
      return {
        ...baseProps,
        maxSize: 5, // MB
        allowedTypes: fieldType === 'image' ? ['image/*'] : ['*/*'],
      };
    case 'address':
      return {
        ...baseProps,
        rows: 3,
      };
    case 'creditcard':
      return {
        ...baseProps,
        pattern: '[0-9\\s-]+',
        maxLength: 19,
      };
    default:
      return baseProps;
  }
};

export default FormBuilder; 