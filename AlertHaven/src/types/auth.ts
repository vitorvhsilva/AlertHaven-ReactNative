export type Usuario = {
    id: string;
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    senha: string;
    dataNascimento: string;
}

export type AuthResponse = {
    usuario: Usuario;
    token: string;
}

export type Login = {
    email: string;
    senha: string;
}

export type Cadastro = {
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    senha: string;
    dataNascimento: string;
}

export interface AuthContextData {
  user: Usuario | null;
  loading: boolean;
  signIn: (credentials: Login) => Promise<void>;
  register: (data: Cadastro) => Promise<void>;
  signOut: () => Promise<void>;
}
