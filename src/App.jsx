import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CircularProgress,
  CircularProgressIndicator,
  CircularProgressLabel,
  Container,
  GridItem,
  Heading,
  HopeProvider,
  HStack,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@hope-ui/solid";
import { Show } from "solid-js";
import ThemeSwitcher from "./components/ThemeSwitcher";
import useBattery from "./hooks/useBattery";

export default function App() {
  const { store } = useBattery();
  return (
    <HopeProvider config={{ initialColorMode: "dark" }}>
      <Box minH={"100vh"} h="$full" w={"$full"} py="$10">
        <VStack spacing={"$3"}>
          <Heading textAlign={"center"} fontSize={"$6xl"}>
            Battery &nbsp;
            <Box as="span" color={"$primary10"}>
              Monitor
            </Box>
          </Heading>

          <HStack spacing={"$2"}>
            <Show when={store.isSupported}>
              <Tag
                colorScheme={store.charging ? "success" : "danger"}
                size={"lg"}
                variant="dot"
                dotPlacement="start"
              >
                <Show when={store.charging} fallback="Discharging">
                  Charging
                </Show>
              </Tag>
            </Show>
            <ThemeSwitcher />
          </HStack>
        </VStack>
        <Container mt={"$10"}>
          <Show
            when={store.isSupported}
            fallback={
              <Alert
                status="danger"
                variant="subtle"
                flexDirection="column"
                justifyContent="center"
                textAlign="center"
                height="200px"
              >
                <AlertIcon boxSize="40px" mr="0" />
                <AlertTitle mt="$4" mb="$1" fontSize="$lg">
                  Unsupported Browser
                </AlertTitle>
                <AlertDescription maxWidth="$sm">
                  Your browser does not support Web Battery API
                </AlertDescription>
              </Alert>
            }
          >
            <SimpleGrid
              w={"$full"}
              columns={{ "@initial": 1, "@sm": 2, "@md": 3 }}
              justifyContent="center"
            >
              <GridItem mx={"auto"}>
                <CircularProgress thickness={"$0_5"} size={"$xs"} value={100}>
                  <CircularProgressIndicator color={"$warning10"} />
                  <CircularProgressLabel>
                    <VStack spacing={"$6"}>
                      <Heading fontSize={"$xl"}> Charging Time</Heading>
                      <Text fontSize={"$xl"}>
                        {Math.round(store.chargingTime / 60)} Minutes
                      </Text>
                    </VStack>
                  </CircularProgressLabel>
                </CircularProgress>
              </GridItem>
              <GridItem mx={"auto"}>
                <CircularProgress size={"$xs"} value={store.level * 100}>
                  <CircularProgressIndicator color={"$success10"} />
                  <CircularProgressLabel>
                    <VStack spacing={"$6"}>
                      <Heading fontSize={"$xl"}> Battery Level</Heading>
                      <Text fontSize={"$xl"}>{store.level * 100} %</Text>
                    </VStack>
                  </CircularProgressLabel>
                </CircularProgress>
              </GridItem>

              <GridItem mx={"auto"}>
                <CircularProgress thickness={"$0_5"} size={"$xs"} value={100}>
                  <CircularProgressIndicator color={"$primary10"} />
                  <CircularProgressLabel>
                    <VStack spacing={"$6"}>
                      <Heading fontSize={"$xl"}> Discharging Time</Heading>
                      <Text fontSize={"$xl"}>
                        {Math.round(store.dischargingTime / 60)} Minutes
                      </Text>
                    </VStack>
                  </CircularProgressLabel>
                </CircularProgress>
              </GridItem>
            </SimpleGrid>
          </Show>
        </Container>
      </Box>
    </HopeProvider>
  );
}
