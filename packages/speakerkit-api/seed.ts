const main = async () => {
  console.log('speakerkit-api seed: no-op');
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch(error => {
    console.error('speakerkit-api seed failed:', error);
    process.exit(1);
  });
