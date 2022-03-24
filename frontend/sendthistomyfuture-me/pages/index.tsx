import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
} from '@chakra-ui/react';
1

const Home: NextPage = () => {
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
            You can&apos;t talk with your past,<br />
            <Text as={'span'} color={'blue.400'}>
              but you can send a letter to your future self.
            </Text>
          </Heading>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Link href="/send-email" passHref>
              <Button
                colorScheme={'green'}
                bg={'blue.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'blue.500',
                }}>
                Get Started
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}

export default Home
