import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { VStack, Heading, useToast } from 'native-base';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import { api } from '../lib/api';

export function Find() {
  const [pollCode, setPollCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { navigate } = useNavigation();
  const toast = useToast();

  async function handleJoinPoll() {
    if (!pollCode.trim()) {
      return toast.show({
        title: 'Informe o código do bolão.',
        placement: 'top',
        bgColor: 'red.500',
      });
    }

    try {
      setIsLoading(true);

      await api.post('/polls/join', { code: pollCode.toUpperCase() });

      toast.show({
        title: 'Você entrou no bolão com sucesso.',
        placement: 'top',
        bgColor: 'green.500',
      });

      navigate('polls');
    } catch (error) {
      console.log(error);
      setIsLoading(false);

      if (error.response?.data?.message === 'Poll not found.') {
        return toast.show({
          title: 'Bolão não encontrado.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      if (error.response?.data?.message === 'You already joined this poll.') {
        return toast.show({
          title: 'Você já está nesse bolão.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      toast.show({
        title: 'Não foi possível encontrar um bolão.',
        placement: 'top',
        bgColor: 'red.500',
      });

      throw error;
    }
  }

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Buscar por código' showBackButton />

      <VStack mt={8} mx={5} alignItems='center'>
        <Heading
          fontFamily='heading'
          color='white'
          fontSize='xl'
          mb={8}
          textAlign='center'
        >
          Encontrar o bolão através do {'\n'} seu código único.
        </Heading>

        <Input
          placeholder='Qual código do bolão?'
          mb={2}
          autoCapitalize='characters'
          onChangeText={setPollCode}
          value={pollCode}
        />

        <Button
          title='Buscar bolão'
          isLoading={isLoading}
          onPress={handleJoinPoll}
        />
      </VStack>
    </VStack>
  );
}
