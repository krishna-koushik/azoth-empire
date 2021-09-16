class PlayerResolver {
  async handle(obj, args, context, info) {
    const { id } = args;
    console.log(context);
    return null;
  }
}

module.exports = new PlayerResolver();
