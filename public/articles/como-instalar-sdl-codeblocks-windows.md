---
title: Instalação da biblioteca SDL no Code::Blocks + Windows
author: Pedro Ricardo
publishDate: 2025-05-12
tags: sdl,c,windows
authorImage: https://github.com/phricardo.png
---

# Instalação da biblioteca SDL no Code::Blocks + Windows

A seguir, explico como instalar a biblioteca SDL em ambientes Windows, com recomendações e links úteis.

1. **Instale o Code::Blocks**

   - Acesse https://www.codeblocks.org/downloads/binaries/
   - Baixe o instalador correspondente ao seu sistema e conclua a instalação.

2. **Baixe o SDL2**

   - Vá para https://github.com/libsdl-org/SDL/releases/tag/release-2.30.7
   - Baixe o arquivo **SDL2-devel-2.30.7-mingw.zip**.

3. **Extraia o SDL2**

   - Descompacte `SDL2-devel-2.30.7-mingw.zip` em uma pasta qualquer.
   - Dentro dela, haverá uma subpasta chamada
     - `i686-w64-mingw32` (para Windows **64 bits**)
     - **ou** `x86_64-w64-mingw32` (para Windows **32 bits**).

4. **Copie a pasta para C:\\SDL2**

   - Selecione **apenas** a pasta correta (`i686-w64-mingw32` ou `x86_64-w64-mingw32`).
   - Copie-a para a raiz do disco **C:\\**.
   - Renomeie-a para **SDL2** (ficará `C:\SDL2`).

5. **Remova arquivos desnecessários**

   - Abra `C:\SDL2` e exclua as pastas **share** e **bin** (não serão usadas).

6. **Instale a DLL do SDL2**
   - Volte à pasta original extraída (`SDL2-2.30.7`), depois em  
     `i686-w64-mingw32\bin` (ou `x86_64-w64-mingw32\bin`).
   - Copie o arquivo **SDL2.dll** e cole em:
     - `C:\Windows\System` (se seu Windows for **64 bits**)
     - **ou** `C:\Windows\System32` (se seu Windows for **32 bits**).

Pronto! Agora o Code::Blocks está quase configurado com o SDL2.
Vamos precisar apenas configurar as opções de build do seu projeto.

7. **Abra as Propriedades do Projeto**

   - Clique com o botão direito em **nome_projeto** (na árvore “Projects” em seu Workspace)
   - Selecione **Properties…**

8. **Configure as Diretivas de Busca**

   1. Na janela de propriedades, clique em **Project build options…** (botão inferior)
   2. Selecione a aba **Search directories**
   3. Escolha **Compiler**
   4. Clique em **Add** e insira:

   ```js
   C:\SDL2\include
   ```

   5. Se essa entrada já existir, não faça nada.
   6. Escolha **Linker**
   7. Clique em **Add** e insira:

   ```js
   C:\SDL2\lib
   ```

   8. Se essa entrada já existir, não faça nada.
   9. Escolha **Linker settings** e depois em other linker options cole:

   ```js
   -lmingw32 - lSDL2main - lSDL2;
   ```

   10. Depois feche tudo clicando em OK

9. **Salve e Feche**
   - Clique em **OK** para aplicar as configurações e fechar todas as janelas.

Pronto! O seu projeto já conhece os headers do SDL2. 😊
