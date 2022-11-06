import { HStack, Text, Box } from 'native-base';
import CountryFlag from 'react-native-country-flag';

import { Input } from './Input';

interface Props {
  code: string;
  position: 'left' | 'right';
  onChangeText: (value: string) => void;
  teamPoints: number | undefined;
}

export function Team({ code, position, onChangeText, teamPoints }: Props) {
  return (
    <HStack alignItems='center'>
      {position === 'left' && (
        <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />
      )}

      {!teamPoints ? (
        <Input
          w={10}
          h={9}
          textAlign='center'
          fontSize='xs'
          keyboardType='numeric'
          onChangeText={onChangeText}
          _focus={{
            borderColor: 'gray.300',
          }}
        />
      ) : (
        <Box
          w={10}
          h={9}
          alignItems='center'
          justifyContent='center'
          borderWidth={1}
          borderRadius={3}
          borderColor='gray.600'
        >
          <Text fontSize='xs' color='white'>
            {teamPoints}
          </Text>
        </Box>
      )}

      {position === 'right' && (
        <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />
      )}
    </HStack>
  );
}
