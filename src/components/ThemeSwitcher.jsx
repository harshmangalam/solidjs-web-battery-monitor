import { Button, useColorMode } from "@hope-ui/solid";

export default function ThemeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      rounded={"$full"}
      size="sm"
      colorScheme={"warning"}
      onClick={toggleColorMode}
    >
      {colorMode() === "light" ? "Light" : "Dark"} mode
    </Button>
  );
}
