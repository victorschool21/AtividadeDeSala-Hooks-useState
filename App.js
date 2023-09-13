import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker, ScrollView, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const App = () => {
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [idioma, setIdioma] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [userData, setUserData] = useState({});
  const [emailError, setEmailError] = useState(false);
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    setEmailError(email !== confirmarEmail && email !== '' && confirmarEmail !== '');
    setFormError(
      !nome ||
      !genero ||
      !dataNascimento ||
      !usuario ||
      !senha ||
      !email ||
      !confirmarEmail ||
      !cpf ||
      !idioma ||
      email !== confirmarEmail
    );

    if (!formError) {
      setUserData({
        Nome: nome,
        Gênero: genero,
        'Data de Nascimento': dataNascimento,
        Usuário: usuario,
        Senha: senha,
        Email: email,
        CPF: cpf,
        'Idioma do Currículo': idioma,
      });
    }
  }, [email, confirmarEmail, nome, genero, dataNascimento, usuario, senha, cpf, idioma, formError]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <View style={styles.card}>
        <Text>Nome:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setNome(text)}
          value={nome}
        />

        <Text>Gênero:</Text>
        <Picker
          style={styles.input}
          selectedValue={genero}
          onValueChange={(itemValue) => setGenero(itemValue)}
        >
          <Picker.Item label="Selecione o gênero" value="" />
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Feminino" value="Feminino" />
        </Picker>

        <Text>Data de Nascimento:</Text>
        <TextInputMask
          style={styles.input}
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
          onChangeText={(text) => setDataNascimento(text)}
          value={dataNascimento}
        />

        <Text>Usuário:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUsuario(text)}
          value={usuario}
        />

        <Text>Senha:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setSenha(text)}
          value={senha}
          secureTextEntry={true}
        />

        <Text>E-mail:</Text>
        <TextInput
          style={[styles.input, emailError && styles.inputError]}
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />

        {emailError && <Text style={styles.errorMessage}>E-mails não coincidem</Text>}

        <Text>Confirme seu e-mail:</Text>
        <TextInput
          style={[styles.input, emailError && styles.inputError]}
          onChangeText={(text) => setConfirmarEmail(text)}
          value={confirmarEmail}
          keyboardType="email-address"
        />

        <Text>CPF:</Text>
        <TextInputMask
          style={styles.input}
          type={'cpf'}
          onChangeText={(text) => setCpf(text)}
          value={cpf}
        />

        <Text>Idioma do Currículo:</Text>
        <Picker
          style={styles.input}
          selectedValue={idioma}
          onValueChange={(itemValue) => setIdioma(itemValue)}
        >
          <Picker.Item label="Selecione o idioma" value="" />
          <Picker.Item label="Inglês" value="Inglês" />
          <Picker.Item label="Espanhol" value="Espanhol" />
          <Picker.Item label="Português" value="Português" />
        </Picker>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setSubmitted(true)}
        >
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>
      </View>

      {formError && (
        <Text style={styles.errorMessage}>Preencha todos os campos corretamente antes de prosseguir.</Text>
      )}

      {submitted && !formError && (
        <View style={styles.submittedData}>
          <Text style={styles.submittedTitle}>Dados informados:</Text>
          {Object.entries(userData).map(([key, value]) => (
            <Text key={key}>
              <Text style={styles.boldText}>{key}: </Text>
              {value}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  submittedData: {
    marginTop: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  submittedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default App;
