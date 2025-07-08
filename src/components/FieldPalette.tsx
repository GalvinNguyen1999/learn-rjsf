'use client';

import React from 'react';
import {
  VStack,
  HStack,
  Text,
  Box,
  Icon,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react';
import { 
  FiType, 
  FiMail, 
  FiHash, 
  FiFileText, 
  FiList, 
  FiCheckSquare, 
  FiCircle,
  FiCalendar,
  FiClock,
  FiLink,
  FiPhone,
  FiLock,
  FiImage,
  FiUpload,
  FiMapPin,
  FiCreditCard,
} from 'react-icons/fi';

interface FieldPaletteProps {
  onAddField: (fieldType: string) => void;
}

interface FieldType {
  type: string;
  label: string;
  icon: React.ComponentType;
  description: string;
  category: string;
}

const fieldTypes: FieldType[] = [
  // Basic Fields
  {
    type: 'text',
    label: 'Text Input',
    icon: FiType,
    description: 'Single line text',
    category: 'Basic',
  },
  {
    type: 'email',
    label: 'Email',
    icon: FiMail,
    description: 'Email with validation',
    category: 'Basic',
  },
  {
    type: 'number',
    label: 'Number',
    icon: FiHash,
    description: 'Numeric input',
    category: 'Basic',
  },
  {
    type: 'textarea',
    label: 'Text Area',
    icon: FiFileText,
    description: 'Multi-line text',
    category: 'Basic',
  },
  {
    type: 'password',
    label: 'Password',
    icon: FiLock,
    description: 'Password field',
    category: 'Basic',
  },
  {
    type: 'phone',
    label: 'Phone',
    icon: FiPhone,
    description: 'Phone number',
    category: 'Basic',
  },
  {
    type: 'url',
    label: 'URL',
    icon: FiLink,
    description: 'Website URL',
    category: 'Basic',
  },

  // Choice Fields
  {
    type: 'select',
    label: 'Select',
    icon: FiList,
    description: 'Dropdown selection',
    category: 'Choice',
  },
  {
    type: 'radio',
    label: 'Radio',
    icon: FiCircle,
    description: 'Radio buttons',
    category: 'Choice',
  },
  {
    type: 'checkbox',
    label: 'Checkbox',
    icon: FiCheckSquare,
    description: 'Boolean checkbox',
    category: 'Choice',
  },

  // Date & Time
  {
    type: 'date',
    label: 'Date',
    icon: FiCalendar,
    description: 'Date picker',
    category: 'Date & Time',
  },
  {
    type: 'datetime',
    label: 'Date & Time',
    icon: FiClock,
    description: 'Date and time picker',
    category: 'Date & Time',
  },

  // Advanced Fields
  {
    type: 'file',
    label: 'File Upload',
    icon: FiUpload,
    description: 'File upload field',
    category: 'Advanced',
  },
  {
    type: 'image',
    label: 'Image Upload',
    icon: FiImage,
    description: 'Image upload field',
    category: 'Advanced',
  },
  {
    type: 'address',
    label: 'Address',
    icon: FiMapPin,
    description: 'Address input',
    category: 'Advanced',
  },
  {
    type: 'creditcard',
    label: 'Credit Card',
    icon: FiCreditCard,
    description: 'Credit card input',
    category: 'Advanced',
  },
];

const FieldPalette: React.FC<FieldPaletteProps> = ({ onAddField }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('blue.50', 'blue.900');
  const categoryBg = useColorModeValue('gray.100', 'gray.600');

  const groupedFields = fieldTypes.reduce((acc, field) => {
    if (!acc[field.category]) {
      acc[field.category] = [];
    }
    acc[field.category].push(field);
    return acc;
  }, {} as Record<string, FieldType[]>);

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={1}>
          Form Fields
        </Text>
        <Text fontSize="sm" color="gray.500">
          Drag or click to add fields
        </Text>
      </Box>
      
      <VStack spacing={4} align="stretch">
        {Object.entries(groupedFields).map(([category, fields]) => (
          <Box key={category}>
            <Text 
              fontSize="sm" 
              fontWeight="semibold" 
              color="gray.600" 
              mb={3}
              px={2}
              py={1}
              bg={categoryBg}
              borderRadius="md"
            >
              {category}
            </Text>
            
            <SimpleGrid columns={1} spacing={2}>
              {fields.map((fieldType) => (
                <Box
                  key={fieldType.type}
                  p={3}
                  bg={bgColor}
                  border="1px"
                  borderColor={borderColor}
                  borderRadius="md"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{
                    bg: hoverBg,
                    borderColor: 'blue.300',
                    transform: 'translateY(-1px)',
                    boxShadow: 'sm',
                  }}
                  onClick={() => onAddField(fieldType.type)}
                >
                  <HStack spacing={3}>
                    <Icon as={fieldType.icon} color="blue.500" boxSize={4} />
                    <VStack align="start" spacing={0} flex={1}>
                      <Text fontSize="sm" fontWeight="medium">
                        {fieldType.label}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {fieldType.description}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default FieldPalette; 