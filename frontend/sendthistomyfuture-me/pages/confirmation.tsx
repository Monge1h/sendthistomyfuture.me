import type { NextPage } from 'next'
import {
  Box,
  Heading,
  Text,
  Stack,
  Flex,
} from '@chakra-ui/react';
1

const Confirmation: NextPage = () => {
  return (
    <>
      <Flex  height={'100vh'} alignItems={'center'} justifyContent={'center'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            We send you a email to verificate your {" "}
            <Text as={'span'} color={'blue.400'}>
             mail.
            </Text>
          </Heading>
        </Stack>
      </Flex>
    </>
  );
}

export default Confirmation
