const bcrypt = require('bcryptjs');

const isMatch = bcrypt.compareSync( 'M&kPXLAW@q', '$2a$08$PMpPAMobyYcHQv9Jb/82Du9Ni78Kxdz5ezn7QnVE/0kzid9AU2Sje');
console.log(isMatch,'isMatch')
console.log(bcrypt.hashSync('M&kPXLAW@q', 8))