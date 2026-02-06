import {
  Grid,
  Stack,
  Paper,
  Skeleton,
  Group,
  Box,
  SimpleGrid,
  Divider,
} from "@mantine/core";

const WeatherSkeleton = () => {
  return (
    <Stack gap="lg">
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 5, lg: 4 }}>
          <Paper withBorder p="md" radius="md" h="100%" bg="transparent">
            <Stack gap="xl" h="100%" justify="space-between">
              <Box>
                <Group justify="space-between" align="flex-start">
                  <Box style={{ flex: 1 }}>
                    <Skeleton height={35} width="70%" mb={8} />
                    <Skeleton height={18} width="40%" />
                  </Box>
                  <Skeleton height={30} width={60} />
                </Group>
              </Box>
              <Box py="lg">
                <Group justify="space-between" align="center" wrap="nowrap">
                  <Stack gap={0} style={{ flex: 1 }}>
                    <Skeleton height={80} width="80%" mb="md" />
                    <Skeleton height={25} width="60%" mb="sm" />
                    <Skeleton height={20} width="40%" />
                  </Stack>
                  <Skeleton height={120} width={120} circle />
                </Group>
              </Box>

              <Box>
                <Divider color="indigo.2" style={{ opacity: 0.1 }} mb="xl" />
                <Grid gutter="xl">
                  {[...Array(6)].map((_, i) => (
                    <Grid.Col span={6} key={i}>
                      <Group gap="sm" wrap="nowrap">
                        <Skeleton height={42} width={42} radius="md" />
                        <Stack gap={4} style={{ flex: 1 }}>
                          <Skeleton height={10} width="60%" />
                          <Skeleton height={14} width="80%" />
                        </Stack>
                      </Group>
                    </Grid.Col>
                  ))}
                </Grid>
              </Box>
              <Box>
                <Divider color="indigo.2" style={{ opacity: 0.1 }} mb="lg" />
                <Grid>
                  <Grid.Col span={6}>
                    <Group gap="sm">
                      <Skeleton height={24} width={24} />
                      <Box style={{ flex: 1 }}>
                        <Skeleton height={10} mb={5} />
                        <Skeleton height={14} />
                      </Box>
                    </Group>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Group gap="sm">
                      <Skeleton height={24} width={24} />
                      <Box style={{ flex: 1 }}>
                        <Skeleton height={10} mb={5} />
                        <Skeleton height={14} />
                      </Box>
                    </Group>
                  </Grid.Col>
                </Grid>
              </Box>
            </Stack>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7, lg: 8 }}>
          <Stack gap="lg">
            <Paper withBorder p="md" radius="md">
              <Skeleton height={20} width={160} mb="md" />
              <SimpleGrid cols={{ base: 2, sm: 3, lg: 6 }} spacing="md">
                {[...Array(6)].map((_, i) => (
                  <Paper
                    key={i}
                    p="sm"
                    radius="md"
                    bg="var(--mantine-color-primary)"
                    opacity={0.5}
                  >
                    <Stack align="center" gap={8}>
                      <Skeleton height={12} width="50%" />
                      <Skeleton height={42} width={42} circle />
                      <Skeleton height={20} width="60%" />
                    </Stack>
                  </Paper>
                ))}
              </SimpleGrid>
            </Paper>

            <Paper withBorder p="md" radius="md">
              <Skeleton height={20} width={160} mb="md" />
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
                {[...Array(6)].map((_, i) => (
                  <Paper
                    key={i}
                    withBorder
                    p="md"
                    radius="md"
                    bg="var(--mantine-color-primary)"
                    opacity={0.5}
                  >
                    <Stack gap="sm">
                      <Box>
                        <Skeleton height={16} width="60%" mb={6} />
                        <Skeleton height={12} width="40%" />
                      </Box>
                      <Group justify="center" py="xs">
                        <Skeleton height={42} width={42} circle />
                      </Group>
                      <Divider variant="dashed" />
                      <Group justify="space-between">
                        <Skeleton height={14} width={35} />
                        <Skeleton height={14} width={35} />
                        <Skeleton height={14} width={35} />
                      </Group>
                    </Stack>
                  </Paper>
                ))}
              </SimpleGrid>
            </Paper>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default WeatherSkeleton;
