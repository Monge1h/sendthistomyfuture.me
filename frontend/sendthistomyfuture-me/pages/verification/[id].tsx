import { useRouter } from 'next/router';
import type { NextPage } from 'next'
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

const verificationPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  
  return (
	  
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

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
            Now that your email is verified, <br />
            <Text as={'span'} color={'blue.400'}>
			we will send your letter soon. 
            </Text>
          </Heading>
        </Stack>
      </Flex>
    </>
  );
}

export default verificationPage
