// Stub para react/compiler-runtime que não existe no React 18
// Este módulo é usado para resolver o problema de compatibilidade
// entre Sanity 4.14.0 (que requer React 19) e React 18

// O react-compiler-runtime é usado pelo React Compiler do React 19
// Como estamos usando React 18, fornecemos um stub vazio
// que simplesmente retorna os valores sem transformação

// Exportar um objeto vazio para evitar erros de importação
export default {}

// Exportar funções stub caso sejam necessárias
export const jsx = (type, props, key) => ({ type, props, key })
export const jsxs = (type, props, key) => ({ type, props, key })
export const Fragment = Symbol.for('react.fragment')

