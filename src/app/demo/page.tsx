'use client';

import { ChakraProvider, Box, VStack, Text, Button, HStack } from '@chakra-ui/react';
import FormRenderer from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';

// Demo form schema
const demoSchema = {
  type: 'object',
  title: 'Contact Form',
  description: 'A sample contact form built with Form Builder',
  properties: {
    name: {
      type: 'string',
      title: 'Full Name',
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: 'string',
      title: 'Email Address',
      format: 'email',
    },
    phone: {
      type: 'string',
      title: 'Phone Number',
    },
    message: {
      type: 'string',
      title: 'Message',
      minLength: 10,
      maxLength: 500,
    },
    department: {
      type: 'string',
      title: 'Department',
      enum: ['Sales', 'Support', 'Marketing', 'Other'],
      enumNames: ['Sales', 'Support', 'Marketing', 'Other'],
    },
    priority: {
      type: 'string',
      title: 'Priority',
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      enumNames: ['Low', 'Medium', 'High', 'Urgent'],
    },
    subscribe: {
      type: 'boolean',
      title: 'Subscribe to newsletter',
      default: false,
    },
    birthDate: {
      type: 'string',
      title: 'Birth Date',
      format: 'date',
    },
  },
  required: ['name', 'email', 'message'],
};

const demoUISchema = {
  message: {
    'ui:widget': 'textarea',
    'ui:options': {
      rows: 4,
    },
  },
  priority: {
    'ui:widget': 'radio',
  },
  birthDate: {
    'ui:widget': 'date',
  },
};

export default function DemoPage() {
  const handleSubmit = ({ formData }: { formData: any }) => {
    console.log('Form submitted:', formData);
    alert('Form submitted successfully! Check console for data.');
  };

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50" py={8}>
        <VStack spacing={8} maxW="800px" mx="auto" px={4}>
          <VStack spacing={4} textAlign="center">
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">
              Form Builder Demo
            </Text>
            <Text fontSize="lg" color="gray.600">
              This is a sample form created with our Form Builder
            </Text>
          </VStack>

          <Box bg="white" p={8} borderRadius="lg" shadow="lg" w="full">
            <FormRenderer
              schema={demoSchema}
              uiSchema={demoUISchema}
              validator={validator}
              onSubmit={handleSubmit}
              showErrorList={false}
            />
          </Box>

          <HStack spacing={4}>
            <Button
              as="a"
              href="/"
              colorScheme="blue"
              variant="outline"
            >
              ← Back to Builder
            </Button>
            <Button
              onClick={() => {
                console.log('Schema:', demoSchema);
                console.log('UI Schema:', demoUISchema);
                alert('Check console for schema data!');
              }}
              colorScheme="green"
            >
              View Schema
            </Button>
          </HStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
} 