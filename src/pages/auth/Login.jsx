import {
    Paper,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Text,
    Anchor,
    Container,
    Divider,
    Group,
  } from '@mantine/core';
  import { useForm } from '@mantine/form';
  import { IconBrandGoogle } from '@tabler/icons-react';
  
  export default function Login() {
    const form = useForm({
      initialValues: {
        email: '',
        password: '',
      },
  
      validate: {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        password: (value) =>
          value.length < 6 ? 'Password must be at least 6 characters' : null,
      },
    });
  
    const handleLogin = (values) => {
      console.log('Login data:', values);
      // Call your API here
    };
  
    return (
      <Container size={420} my={60}>
        <Title align="center">Welcome back 👋</Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Don’t have an account yet?{' '}
          <Anchor href="/register" size="sm">
            Create one
          </Anchor>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleLogin)}>
            <TextInput
              label="Email"
              placeholder="you@email.com"
              required
              {...form.getInputProps('email')}
            />
  
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps('password')}
            />
  
            <Button fullWidth mt="xl" type="submit">
              Log in
            </Button>
          </form>
  
          <Divider label="Or continue with" labelPosition="center" my="lg" />
  
          <Group grow mb="md" mt="md">
            <Button variant="default" leftIcon={<IconBrandGoogle size={16} />}>
              Google
            </Button>
          </Group>
        </Paper>
      </Container>
    );
  }
  