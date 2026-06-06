
export const withUppercase = (Component) => {

  return function ({data}) {

    console.log(data)

    const temp = {
      ...data,
      name: data?.name.toUpperCase(),
      city: data?.city.toUpperCase()
    }

    console.log(temp)
    return (
      <div>
        <label>with uppercase</label>
        <Component {...temp}/>
      </div>
    );
  };
};


