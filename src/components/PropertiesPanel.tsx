'use client';

import React from 'react';
import {
  VStack,
  HStack,
  Text,
  Box,
  Input,
  Textarea,
  Switch,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { FormField, FormSettings } from './FormBuilder';

interface PropertiesPanelProps {
  selectedField: FormField | null;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  formSettings: FormSettings;
  onUpdateSettings: (settings: FormSettings) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedField,
  onUpdateField,
  formSettings,
  onUpdateSettings,
}) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleFieldPropertyChange = (property: string, value: unknown) => {
    if (!selectedField) return;

    const updatedProperties = {
      ...selectedField.properties,
      [property]: value,
    };

    onUpdateField(selectedField.id, { properties: updatedProperties });
  };

  const renderFieldProperties = () => {
    if (!selectedField) {
      return (
        <Box textAlign="center" py={8}>
          <Text color="gray.500" fontSize="sm">
            Select a field to edit its properties
          </Text>
        </Box>
      );
    }

    const properties = selectedField.properties || {};

    return (
      <VStack spacing={4} align="stretch">
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>
            Field Properties
          </Text>
          <Text fontSize="sm" color="gray.600" mb={2}>
            {selectedField.type} field
          </Text>
        </Box>

        <FormControl>
          <FormLabel fontSize="sm">Field Label</FormLabel>
          <Input
            value={selectedField.label}
            onChange={(e) => onUpdateField(selectedField.id, { label: e.target.value })}
            size="sm"
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm">Placeholder</FormLabel>
          <Input
            value={properties.placeholder as string || ''}
            onChange={(e) => handleFieldPropertyChange('placeholder', e.target.value)}
            size="sm"
            placeholder="Enter placeholder text"
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm">Help Text</FormLabel>
          <Textarea
            value={properties.helpText as string || ''}
            onChange={(e) => handleFieldPropertyChange('helpText', e.target.value)}
            size="sm"
            rows={2}
            placeholder="Enter help text"
          />
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel fontSize="sm" mb="0">
            Required Field
          </FormLabel>
          <Switch
            isChecked={properties.required as boolean || false}
            onChange={(e) => handleFieldPropertyChange('required', e.target.checked)}
            size="sm"
          />
        </FormControl>

        {/* Field-specific properties */}
        {renderFieldSpecificProperties()}
      </VStack>
    );
  };

  const renderFieldSpecificProperties = () => {
    if (!selectedField) return null;

    const properties = selectedField.properties || {};
    const fieldType = selectedField.type;

    switch (fieldType) {
      case 'text':
      case 'textarea':
        return (
          <>
            <Divider />
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
              Validation
            </Text>
            
            <HStack spacing={3}>
              <FormControl>
                <FormLabel fontSize="sm">Min Length</FormLabel>
                <NumberInput
                  value={properties.minLength as number || 0}
                  onChange={(_, value) => handleFieldPropertyChange('minLength', value)}
                  min={0}
                  size="sm"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              
              <FormControl>
                <FormLabel fontSize="sm">Max Length</FormLabel>
                <NumberInput
                  value={properties.maxLength as number || 100}
                  onChange={(_, value) => handleFieldPropertyChange('maxLength', value)}
                  min={1}
                  size="sm"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>
          </>
        );

      case 'number':
        return (
          <>
            <Divider />
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
              Validation
            </Text>
            
            <HStack spacing={3}>
              <FormControl>
                <FormLabel fontSize="sm">Min Value</FormLabel>
                <NumberInput
                  value={properties.min as number || 0}
                  onChange={(_, value) => handleFieldPropertyChange('min', value)}
                  size="sm"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              
              <FormControl>
                <FormLabel fontSize="sm">Max Value</FormLabel>
                <NumberInput
                  value={properties.max as number || 100}
                  onChange={(_, value) => handleFieldPropertyChange('max', value)}
                  size="sm"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>
          </>
        );

      case 'select':
      case 'radio':
        return (
          <>
            <Divider />
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
              Options
            </Text>
            
            <FormControl>
              <FormLabel fontSize="sm">Options (comma separated)</FormLabel>
              <Textarea
                value={(properties.options as string[])?.join(', ') || 'Option 1, Option 2, Option 3'}
                onChange={(e) => {
                  const options = e.target.value.split(',').map(opt => opt.trim()).filter(opt => opt);
                  handleFieldPropertyChange('options', options);
                }}
                size="sm"
                rows={3}
                placeholder="Option 1, Option 2, Option 3"
              />
            </FormControl>
          </>
        );

      case 'checkbox':
        return (
          <>
            <Divider />
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
              Default Value
            </Text>
            
            <FormControl display="flex" alignItems="center">
              <FormLabel fontSize="sm" mb="0">
                Checked by default
              </FormLabel>
              <Switch
                isChecked={properties.defaultChecked as boolean || false}
                onChange={(e) => handleFieldPropertyChange('defaultChecked', e.target.checked)}
                size="sm"
              />
            </FormControl>
          </>
        );

      default:
        return null;
    }
  };

  const renderFormSettings = () => {
    return (
      <VStack spacing={4} align="stretch">
        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={4}>
            Form Settings
          </Text>
        </Box>

        <FormControl>
          <FormLabel fontSize="sm">Form Title</FormLabel>
          <Input
            value={formSettings.title}
            onChange={(e) => onUpdateSettings({ ...formSettings, title: e.target.value })}
            size="sm"
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm">Description</FormLabel>
          <Textarea
            value={formSettings.description}
            onChange={(e) => onUpdateSettings({ ...formSettings, description: e.target.value })}
            size="sm"
            rows={2}
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm">Submit Button Text</FormLabel>
          <Input
            value={formSettings.submitText}
            onChange={(e) => onUpdateSettings({ ...formSettings, submitText: e.target.value })}
            size="sm"
          />
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel fontSize="sm" mb="0">
            Show Reset Button
          </FormLabel>
          <Switch
            isChecked={formSettings.showReset}
            onChange={(e) => onUpdateSettings({ ...formSettings, showReset: e.target.checked })}
            size="sm"
          />
        </FormControl>

        {formSettings.showReset && (
          <FormControl>
            <FormLabel fontSize="sm">Reset Button Text</FormLabel>
            <Input
              value={formSettings.resetText}
              onChange={(e) => onUpdateSettings({ ...formSettings, resetText: e.target.value })}
              size="sm"
            />
          </FormControl>
        )}
      </VStack>
    );
  };

  return (
    <Box h="full" overflowY="auto">
      <VStack spacing={6} align="stretch">
        {renderFieldProperties()}
        
        <Divider />
        
        {renderFormSettings()}
      </VStack>
    </Box>
  );
};

export default PropertiesPanel; 