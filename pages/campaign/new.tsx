import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAsync } from "react-use";
import { getETHPrice, getETHPriceInUSD } from "pages/api/getETHPrice";
import Head from "next/head";
import { 
    Alert, 
    AlertDescription, 
    AlertIcon, 
    Box, 
    FormControl, 
    FormHelperText, 
    FormLabel, 
    Heading, 
    Input, 
    InputGroup, 
    InputRightAddon, 
    Stack, 
    Text, 
    Textarea, 
    useColorModeValue,
    Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import NextLinh from "next/link";

//sua wallet, form submit, setTargetInUSD(Math.abs(e.target.value));setMinContriInUSD(Math.abs(e.target.value))

export default function NewCampaign() {
    const {
        handleSubmit,
        register,
        formState: { isSubmitting, errors },
    } = useForm ({
        mode: "onChange",
    });

    const router = useRouter();
    const [error, setError] = useState("");
    //const wallet = useWallet();
    const wallet = useState(false)
    const [minContriInUSD, setMinContriInUSD] = useState();
    const [targetInUSD, setTargetInUSD] = useState();
    const [ETHPrice, setETHPrice] = useState(0);

    useAsync(async () => {
        try {
          let result: any = await getETHPrice();
          setETHPrice(result);
        } catch (error) {
          console.log(error);
        }
    }, []);

    return(
        <div>
            <Head>
                <title>New Campaign</title>
            </Head>
            <main>
                <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
                    <Text fontSize={"lg"} color={"teal.400"}>
                        <ArrowBackIcon mr={2}/>
                        <NextLinh href="/">Back to Home</NextLinh>
                    </Text>
                    <Stack>
                        <Heading fontSize={"4xl"}>Create a New Campaign 📢</Heading>
                    </Stack>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <form>
                            <Stack spacing={4}>
                                <FormControl id="minimumContribution">
                                    <FormLabel>Minimum Contribution Amount</FormLabel>
                                    <InputGroup>
                                        {" "}
                                        <Input
                                            type="number"
                                            step="any"
                                            {...register("minimumContribution", { required: true })}
                                            isDisabled={isSubmitting}
                                            //onChange={(e) => {
                                              //setMinContriInUSD(Math.abs(e.target.value));
                                            //}}
                                        />{" "}
                                        <InputRightAddon children="ETH"/>
                                    </InputGroup>
                                    {minContriInUSD ? (
                                        <FormHelperText>
                                            ~$ {getETHPriceInUSD(ETHPrice, minContriInUSD)}
                                        </FormHelperText>
                                    ) : null}
                                </FormControl>
                                <FormControl id="campaignName">
                                    <FormLabel>Campaign Name</FormLabel>
                                    <Input
                                        {...register("campaignName", { required: true })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormControl id="description">
                                    <FormLabel>Campaign Description</FormLabel>
                                    <Textarea 
                                        {...register("description", { required: true })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormControl id="imageUrl">
                                    <FormLabel>Image URL</FormLabel>
                                    <Input 
                                        {...register("imageUrl", { required: true })}
                                        isDisabled={isSubmitting}
                                        type="url"
                                    />
                                </FormControl>
                                <FormControl id="target">
                                    <FormLabel>Target Amount</FormLabel>
                                    <InputGroup>
                                        <Input 
                                            type="number"
                                            step="any"
                                            {...register("target", { required: true })}
                                            isDisabled={isSubmitting}
                                            //onChange={(e) => {
                                              //setTargetInUSD(Math.abs(e.target.value));
                                            //}}
                                        />
                                        <InputRightAddon children="ETH"/>
                                    </InputGroup>
                                    {targetInUSD ? (
                                        <FormHelperText>
                                            ~$ {getETHPriceInUSD(ETHPrice, targetInUSD)}
                                        </FormHelperText>
                                    ) : null}
                                </FormControl>

                                {error ? (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertDescription mr={2}>{error}</AlertDescription>
                                    </Alert>
                                ) : null}
                                {errors.minimumContribution ||
                                    errors.name ||
                                    errors.description ||
                                    errors.imageUrl ||
                                    errors.target ? (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertDescription mr={2}>
                                        {" "}
                                        All Fields are Required
                                        </AlertDescription>
                                    </Alert>
                                ) : null}
                                <Stack spacing={10}>
                                    <Button
                                        bg={"teal.400"}
                                        color={"white"}
                                        _hover={{
                                            bg: "teal.500",
                                        }}
                                        isLoading={isSubmitting}
                                        type="submit"
                                    >
                                        Create
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </main>
        </div>
    )
}
