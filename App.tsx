import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Navigation from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';

const queryClient = new QueryClient()

function App(): React.JSX.Element {
  const [loading, setLoading] = React.useState(true);

  async function enableMocking() {
    if (!__DEV__) {
      return
    }

    await import('./msw.polyfills')
    const { server } = await import('./src/api/mocks/server')
    server.listen()
  }

  useEffect(() => {
    enableMocking().then(() => setLoading(false));
  }, []);

  if (loading) {
    return <Text>Loading MSW</Text>;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
