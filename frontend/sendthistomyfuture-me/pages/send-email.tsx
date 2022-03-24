import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	Stack,
	Textarea,
	VStack,
	CircularProgress
} from "@chakra-ui/react";

import React, { useState } from "react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { axiosClient } from "../helper/axiosClient";
import { DateTime } from "luxon";

const emailForm: NextPage = () => {
	const [date, setDate] = useState(new Date());
	const [mail, setMail] = useState('');
  	const [body, setBody] = useState('');
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false);
	 const handleSubmit = (event: { preventDefault: () => void; }) => {
		 setIsLoading(true);
		event.preventDefault();
		const dateIso = DateTime.fromJSDate(date).toISODate()
		axiosClient.post('/mails',{
			mail,
			body,
			send_date: dateIso,
			random_date: false
		})
		router.push('/confirmation')
	};
	return (
		<>

			<Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
				<Stack
					as={Box}
					textAlign={"center"}
					spacing={{ base: 8, md: 14 }}
					py={{ base: 20, md: 36 }}
				>
					
						<form onSubmit={handleSubmit}>
					<VStack spacing={5}>

						<FormControl isRequired>
							<FormLabel>Email</FormLabel>

							<InputGroup>
								<Input type="email" name="email" placeholder="Your Email" 
								onChange={e => setMail(e.currentTarget.value)}/>
							</InputGroup>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Message</FormLabel>

							<Textarea
								name="message"
								placeholder="Your Message"
								rows={6}
								resize="none"
								onChange={e => setBody(e.currentTarget.value)}
							/>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Date</FormLabel>
							<SingleDatepicker
								name="date-input"
								date={date}
								onDateChange={setDate}
								
							/>
						</FormControl>

						<Button
							colorScheme="blue"
							bg="blue.400"
							color="white"
							_hover={{
								bg: "blue.500",
							}}
							isFullWidth
							type={'submit'}
						>
							  {isLoading ? (
    <CircularProgress isIndeterminate size="24px" color="teal" />
  ) : (
    'Done :)'
  )}
						</Button>
					</VStack>
					</form>
				</Stack>
			</Flex>
		</>
	);
};

export default emailForm;
