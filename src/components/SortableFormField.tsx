'use client';

import React, { useState } from 'react';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Box,
  HStack,
  VStack,
  Text,
  IconButton,
  Input,
  Button,
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
  Textarea,
  useColorModeValue,
  Badge,
  Tooltip,
} from '@chakra-ui/react';
import { FiMove, FiEdit2, FiTrash2, FiSettings, FiCopy } from 'react-icons/fi';
import { FormField } from './FormBuilder';

interface SortableFormFieldProps {
  field: FormField;
  isSelected?: boolean;
  onSelect: () => void;
  onRemove: (fieldId: string) => void;
  onUpdate: (fieldId: string, updates: Partial<FormField>) => void;
}

const SortableFormField: React.FC<SortableFormFieldProps> = ({
  field,
  isSelected = false,
  onSelect,
  onRemove,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(field.label);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const bgColor = useColorModeValue('white', 'gray.700');
  const selectedBg = useColorModeValue('blue.50', 'blue.900');
  const blueBorder = useColorModeValue('blue.300', 'blue.500');
  const grayBorder = useColorModeValue('gray.200', 'gray.600');
  const borderColor = isSelected ? blueBorder : grayBorder;

  const handleSaveLabel = () => {
    onUpdate(field.id, { label: editLabel });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditLabel(field.label);
    setIsEditing(false);
  };

  const handleDuplicate = () => {
    const duplicatedField: FormField = {
      ...field,
      id: `field-${Date.now()}`,
      label: `${field.label} (Copy)`,
    };
    // This would need to be handled by the parent component
    console.log('Duplicate field:', duplicatedField);
  };

  const renderFieldPreview = () => {
    const { type } = field;
    const properties = field.properties || {};
    
    switch (type) {
      case 'text':
        return (
          <Input 
            placeholder={properties.placeholder as string || "Text input"} 
            isReadOnly 
            size="sm"
          />
        );
      case 'email':
        return (
          <Input 
            type="email" 
            placeholder={properties.placeholder as string || "email@example.com"} 
            isReadOnly 
            size="sm"
          />
        );
      case 'number':
        return (
          <Input 
            type="number" 
            placeholder={properties.placeholder as string || "0"} 
            isReadOnly 
            size="sm"
          />
        );
      case 'textarea':
        return (
          <Textarea 
            placeholder={properties.placeholder as string || "Text area"} 
            isReadOnly 
            size="sm"
            rows={2}
          />
        );
      case 'password':
        return (
          <Input 
            type="password" 
            placeholder={properties.placeholder as string || "Password"} 
            isReadOnly 
            size="sm"
          />
        );
      case 'phone':
        return (
          <Input 
            type="tel" 
            placeholder={properties.placeholder as string || "+1 (555) 123-4567"} 
            isReadOnly 
            size="sm"
          />
        );
      case 'url':
        return (
          <Input 
            type="url" 
            placeholder={properties.placeholder as string || "https://example.com"} 
            isReadOnly 
            size="sm"
          />
        );
      case 'select':
        const options = properties.options as string[] || ['Option 1', 'Option 2', 'Option 3'];
        return (
          <Input
            placeholder="Select option"
            isReadOnly
            value={options[0]}
            size="sm"
          />
        );
      case 'checkbox':
        return <Switch isReadOnly size="sm" />;
      case 'radio':
        const radioOptions = properties.options as string[] || ['Option 1', 'Option 2', 'Option 3'];
        return (
          <VStack align="start" spacing={1}>
            {radioOptions.slice(0, 2).map((option, index) => (
              <Text key={index} fontSize="xs" color="gray.500">
                ○ {option}
              </Text>
            ))}
          </VStack>
        );
      case 'date':
        return (
          <Input 
            type="date" 
            isReadOnly 
            size="sm"
          />
        );
      case 'datetime':
        return (
          <Input 
            type="datetime-local" 
            isReadOnly 
            size="sm"
          />
        );
      case 'file':
        return (
          <Input 
            type="file" 
            isReadOnly 
            size="sm"
            opacity={0.7}
          />
        );
      case 'image':
        return (
          <Input 
            type="file" 
            accept="image/*"
            isReadOnly 
            size="sm"
            opacity={0.7}
          />
        );
      case 'address':
        return (
          <Textarea 
            placeholder="Enter address" 
            isReadOnly 
            size="sm"
            rows={2}
          />
        );
      case 'creditcard':
        return (
          <Input 
            placeholder="1234 5678 9012 3456" 
            isReadOnly 
            size="sm"
          />
        );
      default:
        return <Input placeholder="Field" isReadOnly size="sm" />;
    }
  };

  const getFieldTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      text: 'blue',
      email: 'green',
      number: 'purple',
      textarea: 'cyan',
      password: 'red',
      phone: 'orange',
      url: 'teal',
      select: 'pink',
      checkbox: 'yellow',
      radio: 'indigo',
      date: 'blue',
      datetime: 'blue',
      file: 'gray',
      image: 'green',
      address: 'orange',
      creditcard: 'purple',
    };
    return colorMap[type] || 'gray';
  };

  return (
    <>
      <Box
        ref={setNodeRef}
        style={style}
        p={4}
        bg={isSelected ? selectedBg : bgColor}
        border="2px"
        borderColor={borderColor}
        borderRadius="lg"
        shadow={isSelected ? 'md' : 'sm'}
        cursor="pointer"
        onClick={onSelect}
        transition="all 0.2s"
        _hover={{
          shadow: 'md',
          borderColor: useColorModeValue('blue.200', 'blue.400'),
        }}
      >
        <HStack spacing={3} align="flex-start">
          <Box
            {...attributes}
            {...listeners}
            cursor="grab"
            p={1}
            _hover={{ bg: 'gray.100' }}
            borderRadius="sm"
            onClick={(e) => e.stopPropagation()}
          >
            <FiMove color="gray.400" />
          </Box>
          
          <VStack align="stretch" flex={1} spacing={3}>
            <HStack justify="space-between" align="center">
              <HStack spacing={2}>
                {isEditing ? (
                  <HStack flex={1} spacing={2}>
                    <Input
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                      size="sm"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button size="sm" colorScheme="blue" onClick={handleSaveLabel}>
                      Save
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </HStack>
                ) : (
                  <HStack spacing={2}>
                    <Text fontWeight="medium" fontSize="sm">
                      {field.label}
                    </Text>
                    <Badge 
                      colorScheme={getFieldTypeColor(field.type)} 
                      size="sm"
                      variant="subtle"
                    >
                      {field.type}
                    </Badge>
                    {(field.properties?.required as boolean) && (
                      <Badge colorScheme="red" size="sm" variant="solid">
                        Required
                      </Badge>
                    )}
                  </HStack>
                )}
              </HStack>
              
              <HStack spacing={1}>
                <Tooltip label="Edit label">
                  <IconButton
                    size="sm"
                    variant="ghost"
                    icon={<FiEdit2 />}
                    aria-label="Edit field"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditing(true);
                    }}
                  />
                </Tooltip>
                <Tooltip label="Duplicate field">
                  <IconButton
                    size="sm"
                    variant="ghost"
                    icon={<FiCopy />}
                    aria-label="Duplicate field"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDuplicate();
                    }}
                  />
                </Tooltip>
                <Tooltip label="Field settings">
                  <IconButton
                    size="sm"
                    variant="ghost"
                    icon={<FiSettings />}
                    aria-label="Field settings"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpen();
                    }}
                  />
                </Tooltip>
                <Tooltip label="Remove field">
                  <IconButton
                    size="sm"
                    variant="ghost"
                    icon={<FiTrash2 />}
                    aria-label="Remove field"
                    colorScheme="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(field.id);
                    }}
                  />
                </Tooltip>
              </HStack>
            </HStack>
            
            <Box opacity={0.7}>
              {renderFieldPreview()}
            </Box>

            {(field.properties?.helpText as string) && (
              <Text fontSize="xs" color="gray.500" fontStyle="italic">
                {field.properties?.helpText as string}
              </Text>
            )}
          </VStack>
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Field Settings - {field.label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Field Label</FormLabel>
                <Input
                  value={field.label}
                  onChange={(e) => onUpdate(field.id, { label: e.target.value })}
                />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">
                  Required Field
                </FormLabel>
                <Switch
                  isChecked={field.properties?.required as boolean || false}
                  onChange={(e) => {
                    const updatedProperties = {
                      ...field.properties,
                      required: e.target.checked,
                    };
                    onUpdate(field.id, { properties: updatedProperties });
                  }}
                />
              </FormControl>
              
              <Text fontSize="sm" color="gray.500">
                Field Type: {field.type}
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SortableFormField; 