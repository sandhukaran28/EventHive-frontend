import { Text, Box } from "@mantine/core";

export default function Footer() {
  return (
    <Box py="md" mt="xl">
      <Text align="center" size="xs" c="dimmed">
        © {new Date().getFullYear()} EventHive — All rights reserved
      </Text>
    </Box>
  );
}
