import React, { useEffect, useCallback, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/input';
import Button from '../../components/button';
import Keyboard from '../../components/keyboard';
import Loading from '../../components/loading'
import InfoButton from '../../components/infoButton'

import logo from '../../../assets/logo.png'

import {
  Container,
  ForgotPassword,
  ForgotPasswordText,
} from './styles';


const SignIn = () => {
  const formRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        setLoading(false)
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais.',
        );
      }
    },
    [signIn],
  );

  useEffect(() => { return () => setLoading(false) }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Loading isVisible={loading} />
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logo} style={{ width: 190, height: 150, borderRadius: 0, marginBottom: 10 }} />
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button style={{ borderRadius: 20 }}
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>

            <ForgotPassword
              onPress={() => {
                console.log('alo');
              }}
            >
              <ForgotPasswordText>Esqueceu a senha?</ForgotPasswordText>
            </ForgotPassword>
            <Keyboard>
              <InfoButton onPress={() => navigation.navigate('SignUp')}>
                Não tem uma conta? Cadastre-se
              </InfoButton>
            </Keyboard>
          </Container>
        </ScrollView>

      </KeyboardAvoidingView>

    </>
  );
};

export default SignIn;

