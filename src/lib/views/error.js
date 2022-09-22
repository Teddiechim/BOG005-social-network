export default () => {
    try {
        throw new Error('¡Ups!')
      } catch (e) {
        console.error(e.name + ': ' + e.message)
      }
}