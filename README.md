# 🏥 Med-Agenda

O **Med-Agenda** é um sistema de **agendamento de consultas médicas**, permitindo que pacientes, médicos e administradores possam **criar, visualizar, editar e cancelar consultas** de maneira simples e eficiente.

## 🚀 Funcionalidades Principais

✅ **Autenticação e Autorização**  
   - Login e logout de usuários  
   - Controle de permissões baseado no tipo de usuário (Administrador, Médico, Secretário)  

✅ **Gerenciamento de Consultas**  
   - Criar, visualizar, editar e cancelar consultas  
   - Listar consultas do dia e futuras  
   - Indicar pacientes atendidos e consultas pendentes  
   - Opção de "Check-in" para marcar consulta como finalizada  

✅ **Painel de Controle**  
   - Daboard mostrando estatísticas de consultas  
   - Exibição de consultas organizadas por horário  
   - Filtros para buscas mais rápidas  

✅ **Gerenciamento de Usuários** *(Apenas Administradores)*  
   - Criar novos usuários (médicos, secretários, administradores)  
   - Editar dados dos usuários  
   - Remover usuários do sistema  

✅ **Segurança e Regras de Permissão**  
   - Apenas usuários autenticados podem acessar o sistema  
   - Apenas administradores podem gerenciar usuários  
   - Apenas médicos e secretários podem criar e editar consultas  

---

## 🛠 **Tecnologias Utilizadas**

🔹 **Front-end**  
- React.js + Vite  
- TypeScript  
- Bootstrap (React-Bootstrap)  

🔹 **Back-end & Banco de Dados**  
- Firebase Authentication  
- Firestore Database  

🔹 **Outras Bibliotecas**  
- Date-fns (Manipulação de datas)  
- React Icons (Ícones visuais)  

---

## ⚙️ **Instalação e Configuração**

### **1️⃣ Clone o repositório**

git clone https://github.com/seu-usuario/med-agenda.git
cd med-agenda
2️⃣ Instale as dependências


npm install
3️⃣ Configure o Firebase
Crie um projeto no Firebase Console
Ative Authentication, Firestore Database e Firebase Storage
Crie um arquivo .env.local na raiz do projeto e adicione as credenciais do Firebase:
ini

VITE_FIREBASE_API_KEY=SUACHAVEAQUI
VITE_FIREBASE_AUTH_DOMAIN=SEUDOMINIO.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=SEUPROJECTID
VITE_FIREBASE_STORAGE_BUCKET=SEUBUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=SEUID
VITE_FIREBASE_APP_ID=SEUAPPID
4️⃣ Execute o projeto


npm run dev
Acesse http://localhost:5173 no navegador.

📜 Regras do Firestore (Segurança)
javascript

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Permitir que usuários acessem apenas seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Permitir que apenas administradores possam gerenciar usuários
    match /users/{userId} {
      allow read: if request.auth != null && 
                  get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == "administrador";
    }

    // Permitir que apenas médicos e secretários possam editar consultas
    match /appointments/{appointmentId} {
      allow read: if request.auth != null;
      allow create, update, delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType in ["secretario", "administrador"];
    }
  }
}
🎯 Próximos Melhoramentos
📌 🔜 Implementação de Notificações: Alertas para consultas próximas
📌 🔜 Upload de Arquivos: Permitir anexar exames médicos
📌 🔜 Exportação de Dados: Geração de relatórios em PDF ou Excel

🧑‍💻 Contribuição
Ficou interessado em contribuir com o Med-Agenda?
Sinta-se à vontade para abrir uma Issue ou um Pull Request!



# Crie uma nova branch
git checkout -b minha-feature

# Faça commit das alterações
git commit -m "Minha nova funcionalidade"

# Envie para o repositório remoto
git pu origin minha-feature
📄 Licença
Este projeto está sob a licença MIT.
Feito com ❤️ por Seu Nome

🌎 Contato
📧 Email: rhaneykohonorio@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/rhaneyko/
🚀 GitHub: (https://github.com/rhaneyko)


## **🚀 Conclusão**
✔ **README organizado e bem estruturado** 📝  
✔ **Explica como instalar, rodar e configurar o projeto** ⚙️  
✔ **Inclui tecnologias, regras do Firebase e próximos passos** 🔥  

Agora é só personalizar com **seu nome e repositório GitHub**! 😃  
Se precisar de ajustes, me avise! 🚀