'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// firebase
import { app } from '@/app/firebaseApp';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// toastify
import { toast } from 'react-toastify';

// components
import Button from '@/components/atoms/Button';
import InputTextLabel from '@/components/molecules/InputTextLabel';

import styles from './SignForm.module.scss';

const USER_EMAIL = 'user-email';
const USER_PW = 'user-pw';
const USER_PW2 = 'user-pw2';

interface SignFormProps {
  type?: string;
}

export default function SignForm({ type }: SignFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    switch (name) {
      case USER_EMAIL:
        setEmail(value);

        // 유효성 검사
        const validRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!value?.match(validRegex)) {
          setError('이메일 형식이 올바르지 않습니다.');
        } else {
          setError('');
        }
        break;
      case USER_PW:
        setPassword(value);
        // 패스워드 길이
        if (value?.length < 8) {
          setError('비밀번호는 8자리 이상으로 입력해주세요');
        } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
          setError('비밀번호가 일치하지 않습니다');
        } else {
          setError('');
        }
        break;
      case USER_PW2:
        setPasswordConfirm(value);
        // 패스워드 길이
        if (value?.length < 8) {
          setError('비밀번호는 8자리 이상으로 입력해주세요');
        } else if (value !== password) {
          setError('비밀번호가 일치하지 않습니다');
        } else {
          setError('');
        }
        break;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      if (type === 'signup') {
        // 회원가입
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('회원가입 성공');
      } else if (type === 'signin') {
        // 로그인
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('로그인 성공');
      }

      router.push('/');
    } catch (error: any) {
      let errorMsg = error?.code;

      if ((errorMsg = 'auth/email-already-in-use')) {
        errorMsg = '이미 사용중인 이메일입니다.';
      } else if ((errorMsg = 'auth/invalid-login-credentials')) {
        errorMsg = '아이디와 비밀번호를 다시 확인해주세요!';
      }

      console.log(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <InputTextLabel
        id={USER_EMAIL}
        type="email"
        label="이메일"
        onChange={onChange}
      />
      <InputTextLabel
        id={USER_PW}
        type="password"
        label="비밀번호"
        onChange={onChange}
      />

      {type === 'signup' && (
        <InputTextLabel
          id={USER_PW2}
          type="password"
          label="비밀번호 확인"
          onChange={onChange}
        />
      )}

      {error && <p>{error}</p>}
      <Button type="submit">{type === 'signup' ? '회원가입' : '로그인'}</Button>
    </form>
  );
}
