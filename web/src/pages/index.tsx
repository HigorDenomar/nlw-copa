import { FormEvent, useState } from 'react';
import Image from 'next/image';

import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import iconCheckImage from '../assets/icon-check.svg';
import { api } from '../lib/axios';

interface User {
  id: string;
  name: string;
  avatarUrl: string;
}
interface HomeProps {
  pollCount: number;
  guessCount: number;
  usersData: {
    count: number;
    users: User[];
  };
}

export default function Home(props: HomeProps) {
  const [pollTitle, setPollTitle] = useState('');

  console.log(props.usersData);

  async function createPoll(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('/polls', {
        title: pollTitle,
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      alert(
        `Bolão criado com sucesso, o código '${code}' foi copiado para a área de transferência!`
      );

      setPollTitle('');
    } catch (error) {
      alert('Falha ao criar o bolão, tente novamente!');
      console.error(error);
    }
  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main>
        <Image src={logoImg} alt='NLW Copa' />

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
          Crie seu próprio bolãos da copa e compartilhe entre amigos!
        </h1>

        <div className='mt-10 flex items-center gap-2'>
          <div className='flex mr-7'>
            {props.usersData.users.map(user => (
              <Image
                key={user.id}
                src={user.avatarUrl}
                alt={user.name}
                title={user.name}
                width={56}
                height={56}
                className='rounded-full border border-gray-900 border-4 mr-[-20px]'
              />
            ))}
          </div>

          <strong className='text-gray-100 text-xl'>
            <span className='text-green-500'>+{props.usersData.count}</span>{' '}
            pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPoll} className='mt-10 flex gap-2'>
          <input
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100'
            type='text'
            required
            placeholder='Qual nome do seu bolão?'
            value={pollTitle}
            onChange={event => setPollTitle(event.target.value)}
          />

          <button
            className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700 transition-colors'
            type='submit'
          >
            Criar meu bolão
          </button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImage} alt='' />

            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.pollCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600' />

          <div className='flex items-center gap-6'>
            <Image src={iconCheckImage} alt='' />

            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt='Dois celulares exibindo uma prévia do aplicativo móvel do NLW Copa'
        quality={100}
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const [pollCountResponse, guessCountResponse, usersResponse] =
    await Promise.all([
      api.get('/polls/count'),
      api.get('/guesses/count'),
      api.get('/users/count'),
    ]);

  return {
    props: {
      pollCount: pollCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      usersData: usersResponse.data,
    },
  };
};
