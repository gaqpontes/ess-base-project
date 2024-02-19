export interface RecoveryToken {
    email: string;
    token: string;
  }
  
  export default class RecoveryTokensDatabase {
    private static instance: RecoveryTokensDatabase;
    private recoveryTokens: RecoveryToken[];
  
    public constructor() {
      this.recoveryTokens = [];
    }
  
    static getInstance() {
      if (!RecoveryTokensDatabase.instance) {
        RecoveryTokensDatabase.instance = new RecoveryTokensDatabase();
      }
      return RecoveryTokensDatabase.instance;
    }
  
    // Método para adicionar um novo token de recuperação
    addRecoveryToken(email: string, token: string) {
      this.recoveryTokens.push({ email, token });
    }
  
    // Método para obter um token de recuperação pelo e-mail do usuário
    getRecoveryTokenByEmail(email: string): RecoveryToken | undefined {
      return this.recoveryTokens.find((recoveryToken) => recoveryToken.email === email);
    }
  
    // Método para remover um token de recuperação com base no e-mail do usuário
    deleteRecoveryTokenByEmail(email: string) {
      const index = this.recoveryTokens.findIndex((recoveryToken) => recoveryToken.email === email);
      if (index !== -1) {
        this.recoveryTokens.splice(index, 1);
      }
    }
  
    // Método para obter todos os tokens de recuperação
    getAllRecoveryTokens() {
      return [...this.recoveryTokens]; // Retorna uma cópia para evitar alterações indesejadas
    }
  }
  