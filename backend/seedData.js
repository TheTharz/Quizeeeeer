const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Quiz = require('./models/Quiz');
const Question = require('./models/Question');

// Connect to MongoDB
mongoose
  .connect('mongodb://dev:D3vQuizApp!2024$@localhost:27017/quizApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const seedDatabase = async () => {
  // Clear existing data
  await User.deleteMany({});
  await Quiz.deleteMany({});
  await Question.deleteMany({});

  // Hashing password for users
  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash('password123', salt);

  // Insert 5 users (1 admin, 4 regular users)
  const users = await User.insertMany([
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    },
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
      role: 'user',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: hashedPassword,
      role: 'user',
    },
    {
      name: 'Michael Johnson',
      email: 'michael.johnson@example.com',
      password: hashedPassword,
      role: 'user',
    },
    {
      name: 'Emily Brown',
      email: 'emily.brown@example.com',
      password: hashedPassword,
      role: 'user',
    },
  ]);

  console.log('Users inserted:', users);

  // Insert 5 quizzes with meaningful data
  const quizzes = await Quiz.insertMany([
    {
      title: 'World War II History',
      description: 'Test your knowledge on World War II history',
      timeLimit: 30,
      maxAttempts: 3,
    },
    {
      title: 'Basic Biology',
      description: 'A quiz covering fundamental concepts in biology',
      timeLimit: 40,
      maxAttempts: 2,
    },
    {
      title: 'Shakespeare Plays',
      description: "Explore your knowledge of William Shakespeare's plays",
      timeLimit: 50,
      maxAttempts: 4,
    },
    {
      title: 'Capitals of the World',
      description: 'Identify the capitals of various countries',
      timeLimit: 35,
      maxAttempts: 3,
    },
    {
      title: 'Latest Technology Trends',
      description: 'Quiz on the most recent advancements in technology',
      timeLimit: 60,
      maxAttempts: 5,
    },
  ]);

  console.log('Quizzes inserted:', quizzes);

  // Define questions for each quiz
  const quizQuestions = {
    'World War II History': [
      {
        questionText: 'What year did World War II start?',
        options: ['1935', '1936', '1939', '1941', '1945'],
        correctAnswers: ['1939'],
      },
      {
        questionText:
          'Who was the Prime Minister of the UK during World War II?',
        options: [
          'Winston Churchill',
          'Neville Chamberlain',
          'Clement Attlee',
          'Anthony Eden',
          'Harold Macmillan',
        ],
        correctAnswers: ['Winston Churchill'],
      },
      {
        questionText: 'What event marked the beginning of World War II?',
        options: [
          'Invasion of Poland',
          'Attack on Pearl Harbor',
          'Battle of Britain',
          'D-Day',
          'Fall of France',
        ],
        correctAnswers: ['Invasion of Poland'],
      },
      {
        questionText: 'Which countries were known as the Axis Powers?',
        options: [
          'Germany, Italy, Japan',
          'USA, UK, USSR',
          'France, Canada, Australia',
          'China, India, Brazil',
          'Spain, Portugal, Greece',
        ],
        correctAnswers: ['Germany, Italy, Japan'],
      },
      {
        questionText: 'What was the main purpose of the Manhattan Project?',
        options: [
          'Developing radar technology',
          'Creating the atomic bomb',
          'Decoding enemy communications',
          'Designing aircraft carriers',
          'Developing new tanks',
        ],
        correctAnswers: ['Creating the atomic bomb'],
      },
      {
        questionText: 'What was the largest amphibious invasion in history?',
        options: [
          'D-Day',
          'Battle of Midway',
          'Invasion of Sicily',
          'Operation Barbarossa',
          'Battle of the Bulge',
        ],
        correctAnswers: ['D-Day'],
      },
      {
        questionText:
          'Which battle is often considered the turning point in the Pacific Theater?',
        options: [
          'Battle of Midway',
          'Battle of Guadalcanal',
          'Battle of Iwo Jima',
          'Battle of Okinawa',
          'Battle of the Coral Sea',
        ],
        correctAnswers: ['Battle of Midway'],
      },
      {
        questionText: 'What was the Holocaust?',
        options: [
          'A military strategy',
          'The genocide of Jews and others by Nazi Germany',
          'An alliance of countries',
          'A peace treaty',
          'A major battle',
        ],
        correctAnswers: ['The genocide of Jews and others by Nazi Germany'],
      },
      {
        questionText:
          'Which country was invaded by Germany in 1940, leading to the evacuation at Dunkirk?',
        options: ['Belgium', 'France', 'Netherlands', 'Poland', 'Norway'],
        correctAnswers: ['France'],
      },
      {
        questionText:
          'Who was the leader of the Soviet Union during World War II?',
        options: [
          'Joseph Stalin',
          'Leon Trotsky',
          'Vladimir Lenin',
          'Nikita Khrushchev',
          'Mikhail Gorbachev',
        ],
        correctAnswers: ['Joseph Stalin'],
      },
      {
        questionText: 'What was the purpose of the Lend-Lease Act?',
        options: [
          'To provide military aid to Allied nations',
          'To enforce rationing in the USA',
          'To prepare for an invasion of Europe',
          'To establish military bases in Asia',
          'To negotiate peace with Axis powers',
        ],
        correctAnswers: ['To provide military aid to Allied nations'],
      },
      {
        questionText: 'What famous speech did Winston Churchill give in 1940?',
        options: [
          'We shall fight on the beaches',
          'I have a dream',
          'The only thing we have to fear is fear itself',
          'Ask not what your country can do for you',
          'Four score and seven years ago',
        ],
        correctAnswers: ['We shall fight on the beaches'],
      },
      {
        questionText: 'Which event prompted the USA to enter World War II?',
        options: [
          'Attack on Pearl Harbor',
          'Invasion of Poland',
          'Battle of Britain',
          'Fall of France',
          'Bombing of London',
        ],
        correctAnswers: ['Attack on Pearl Harbor'],
      },
      {
        questionText: 'What was the significance of the Battle of Stalingrad?',
        options: [
          'It marked the turning point in the Eastern Front',
          'It was the last German offensive in the war',
          'It led to the liberation of Paris',
          'It was the first use of tanks',
          'It ended the war in Europe',
        ],
        correctAnswers: ['It marked the turning point in the Eastern Front'],
      },
      {
        questionText:
          'What was the last major offensive by the Germans in World War II?',
        options: [
          'Battle of the Bulge',
          'Operation Barbarossa',
          'Battle of El Alamein',
          'D-Day',
          'Battle of Midway',
        ],
        correctAnswers: ['Battle of the Bulge'],
      },
      {
        questionText:
          'Who was the commander of the Allied forces during the invasion of Normandy?',
        options: [
          'Dwight D. Eisenhower',
          'George S. Patton',
          'Omar Bradley',
          'Douglas MacArthur',
          'Bernard Montgomery',
        ],
        correctAnswers: ['Dwight D. Eisenhower'],
      },
      {
        questionText: 'What was the main purpose of the Nuremberg Trials?',
        options: [
          'To prosecute war crimes',
          'To negotiate peace treaties',
          'To establish new countries',
          'To determine reparations',
          'To divide Germany',
        ],
        correctAnswers: ['To prosecute war crimes'],
      },
      {
        questionText: 'When did World War II officially end?',
        options: [
          'May 8, 1945',
          'August 15, 1945',
          'September 2, 1945',
          'July 20, 1944',
          'December 7, 1941',
        ],
        correctAnswers: ['September 2, 1945'],
      },
      {
        questionText:
          'What was the codename for the Allied invasion of Normandy?',
        options: [
          'Operation Overlord',
          'Operation Barbarossa',
          'Operation Market Garden',
          'Operation Neptune',
          'Operation Torch',
        ],
        correctAnswers: ['Operation Overlord'],
      },
      {
        questionText:
          'What did the Axis Powers and Allies primarily fight over?',
        options: [
          'Control of Europe',
          'Colonial territories',
          'Trade routes',
          'Political ideology',
          'Religious differences',
        ],
        correctAnswers: ['Control of Europe'],
      },
      {
        questionText:
          'Which treaty officially ended World War I and laid the groundwork for World War II?',
        options: [
          'Treaty of Versailles',
          'Treaty of Trianon',
          'Treaty of Saint-Germain',
          'Treaty of Paris',
          'Treaty of Brest-Litovsk',
        ],
        correctAnswers: ['Treaty of Versailles'],
      },
      {
        questionText:
          'What was the main economic strategy used by the Allies to weaken Germany?',
        options: [
          'Blockade',
          'Trade agreements',
          'Diplomatic negotiations',
          'Currency devaluation',
          'Industrial sabotage',
        ],
        correctAnswers: ['Blockade'],
      },
      {
        questionText:
          'Which country suffered the most casualties during World War II?',
        options: ['Soviet Union', 'Germany', 'Japan', 'USA', 'China'],
        correctAnswers: ['Soviet Union'],
      },
      {
        questionText:
          'What was the name of the secret American project to develop the atomic bomb?',
        options: [
          'Manhattan Project',
          'Apollo Program',
          'Mars Mission',
          'Project Blue Book',
          'Operation Paperclip',
        ],
        correctAnswers: ['Manhattan Project'],
      },
      {
        questionText:
          'Which battle is considered the turning point of the war in North Africa?',
        options: [
          'Battle of El Alamein',
          'Battle of Kasserine Pass',
          'Battle of Tunisia',
          'Battle of Sicily',
          'Battle of Tobruk',
        ],
        correctAnswers: ['Battle of El Alamein'],
      },
      {
        questionText:
          'What was the primary goal of the Blitzkrieg strategy used by Germany?',
        options: [
          'Rapid and overwhelming attacks',
          'Prolonged trench warfare',
          'Defensive maneuvers',
          'Naval supremacy',
          'Guerrilla tactics',
        ],
        correctAnswers: ['Rapid and overwhelming attacks'],
      },
      {
        questionText:
          'Which battle marked the first major defeat of the German army in World War II?',
        options: [
          'Battle of Stalingrad',
          'Battle of Britain',
          'Battle of Moscow',
          'Battle of France',
          'Battle of the Atlantic',
        ],
        correctAnswers: ['Battle of Britain'],
      },
      {
        questionText:
          'What was the main reason for the US dropping atomic bombs on Hiroshima and Nagasaki?',
        options: [
          'To end the war quickly',
          'To demonstrate power to the USSR',
          'To force Japan into unconditional surrender',
          'To punish Japan for Pearl Harbor',
          'To protect American lives',
        ],
        correctAnswers: ['To end the war quickly'],
      },
      {
        questionText:
          'Which of the following was a significant battle in the Pacific Theater?',
        options: [
          'Battle of Midway',
          'Battle of Stalingrad',
          'Battle of El Alamein',
          'Battle of the Bulge',
          'Battle of Britain',
        ],
        correctAnswers: ['Battle of Midway'],
      },
      {
        questionText: 'What was the main outcome of the Potsdam Conference?',
        options: [
          'Decisions on post-war Europe',
          'Creation of the United Nations',
          'Dividing Germany into occupation zones',
          'Establishing the Marshall Plan',
          'Ending the war in the Pacific',
        ],
        correctAnswers: ['Decisions on post-war Europe'],
      },
      {
        questionText:
          'Which resistance movement was active in France during World War II?',
        options: [
          'French Resistance',
          'Partisan Movement',
          'Red Army',
          'Home Army',
          'Free French Forces',
        ],
        correctAnswers: ['French Resistance'],
      },
      {
        questionText:
          'Which country was the last to surrender in World War II?',
        options: ['Japan', 'Germany', 'Italy', 'Hungary', 'Romania'],
        correctAnswers: ['Japan'],
      },
      {
        questionText: 'What was Operation Barbarossa?',
        options: [
          'The German invasion of the Soviet Union',
          'The Allied invasion of Normandy',
          'The Japanese attack on Pearl Harbor',
          'The Italian campaign in North Africa',
          'The defense of Britain',
        ],
        correctAnswers: ['The German invasion of the Soviet Union'],
      },
      {
        questionText:
          'What role did women play in the workforce during World War II?',
        options: [
          'They took on many jobs traditionally held by men',
          'They primarily remained homemakers',
          'They served only in administrative roles',
          'They were mostly excluded from the workforce',
          'They focused on child-rearing',
        ],
        correctAnswers: ['They took on many jobs traditionally held by men'],
      },
      {
        questionText: 'What did the term “Total War” refer to in World War II?',
        options: [
          'The mobilization of all resources for the war effort',
          'The use of nuclear weapons',
          'Warfare between only military forces',
          'Diplomatic negotiations',
          'A focus on naval battles',
        ],
        correctAnswers: [
          'The mobilization of all resources for the war effort',
        ],
      },
      {
        questionText: 'What was the significance of the Battle of the Bulge?',
        options: [
          'It was Germany’s last major offensive',
          'It marked the beginning of the end for the Axis Powers',
          'It was the largest battle fought by the US Army',
          'It led to the liberation of Paris',
          'It was a decisive victory for the Allies',
        ],
        correctAnswers: ['It was Germany’s last major offensive'],
      },
      {
        questionText:
          'What was the primary method of communication used by the Allies during World War II?',
        options: [
          'Enigma machine',
          'Code talkers',
          'Telegraph',
          'Radio',
          'Carrier pigeons',
        ],
        correctAnswers: ['Code talkers'],
      },
      {
        questionText: 'Who were the "code talkers" during World War II?',
        options: [
          'Native American soldiers who used their languages to create secure communications',
          'Espionage agents',
          'Enigma codebreakers',
          'Allied intelligence officers',
          'Resistance fighters',
        ],
        correctAnswers: [
          'Native American soldiers who used their languages to create secure communications',
        ],
      },
      {
        questionText: 'What was the "Final Solution"?',
        options: [
          'Nazi Germany’s plan to exterminate the Jewish population',
          'A military strategy to defeat the Allies',
          'The invasion of the Soviet Union',
          'A peace agreement between Axis powers',
          'A code name for the invasion of Britain',
        ],
        correctAnswers: [
          'Nazi Germany’s plan to exterminate the Jewish population',
        ],
      },
      {
        questionText:
          'What was the significance of the United Nations’ formation after World War II?',
        options: [
          'To promote peace and cooperation among nations',
          'To establish a military alliance',
          'To punish the Axis Powers',
          'To facilitate trade between nations',
          'To support colonial independence movements',
        ],
        correctAnswers: ['To promote peace and cooperation among nations'],
      },
    ],
    'Basic Biology': [
      {
        questionText: 'What is the basic unit of life?',
        options: ['Atom', 'Molecule', 'Cell', 'Organ', 'Tissue'],
        correctAnswers: ['Cell'],
      },
      {
        questionText: 'Which organelle is known as the powerhouse of the cell?',
        options: [
          'Nucleus',
          'Ribosome',
          'Mitochondria',
          'Chloroplast',
          'Endoplasmic Reticulum',
        ],
        correctAnswers: ['Mitochondria'],
      },
      {
        questionText: 'What is the function of ribosomes in a cell?',
        options: [
          'Energy production',
          'Protein synthesis',
          'DNA replication',
          'Photosynthesis',
          'Cell division',
        ],
        correctAnswers: ['Protein synthesis'],
      },
      {
        questionText: 'What is the primary function of the cell membrane?',
        options: [
          'Energy production',
          'Protection and regulation of substances entering and exiting the cell',
          'Protein synthesis',
          'DNA storage',
          'Photosynthesis',
        ],
        correctAnswers: [
          'Protection and regulation of substances entering and exiting the cell',
        ],
      },
      {
        questionText: 'What is the genetic material found in cells?',
        options: ['RNA', 'Proteins', 'DNA', 'Carbohydrates', 'Lipids'],
        correctAnswers: ['DNA'],
      },
      {
        questionText:
          'Which part of the cell is responsible for controlling its activities?',
        options: [
          'Cytoplasm',
          'Nucleus',
          'Mitochondria',
          'Ribosome',
          'Cell membrane',
        ],
        correctAnswers: ['Nucleus'],
      },
      {
        questionText: 'What is the process by which plants make their food?',
        options: [
          'Cellular respiration',
          'Fermentation',
          'Photosynthesis',
          'Digestion',
          'Decomposition',
        ],
        correctAnswers: ['Photosynthesis'],
      },
      {
        questionText: 'What type of cell lacks a nucleus?',
        options: [
          'Eukaryotic cell',
          'Prokaryotic cell',
          'Stem cell',
          'Red blood cell',
          'Neuron',
        ],
        correctAnswers: ['Prokaryotic cell'],
      },
      {
        questionText:
          'Which of the following is a function of the endoplasmic reticulum?',
        options: [
          'DNA replication',
          'Protein and lipid synthesis',
          'Energy production',
          'Cell division',
          'Waste removal',
        ],
        correctAnswers: ['Protein and lipid synthesis'],
      },
      {
        questionText:
          'What organelle is responsible for photosynthesis in plant cells?',
        options: [
          'Mitochondria',
          'Chloroplast',
          'Nucleus',
          'Ribosome',
          'Golgi apparatus',
        ],
        correctAnswers: ['Chloroplast'],
      },
      {
        questionText:
          'What is the primary component of the cell wall in plants?',
        options: ['Chitin', 'Cellulose', 'Lignin', 'Protein', 'DNA'],
        correctAnswers: ['Cellulose'],
      },
      {
        questionText: 'What is the role of the Golgi apparatus?',
        options: [
          'Protein synthesis',
          'Modification and packaging of proteins',
          'Energy production',
          'Storage of nutrients',
          'DNA replication',
        ],
        correctAnswers: ['Modification and packaging of proteins'],
      },
      {
        questionText:
          'Which process involves the movement of water across a semipermeable membrane?',
        options: [
          'Diffusion',
          'Osmosis',
          'Active transport',
          'Facilitated diffusion',
          'Endocytosis',
        ],
        correctAnswers: ['Osmosis'],
      },
      {
        questionText:
          'What is a group of similar cells that perform a specific function called?',
        options: [
          'Tissue',
          'Organ',
          'Organ system',
          'Cell culture',
          'Organism',
        ],
        correctAnswers: ['Tissue'],
      },
      {
        questionText:
          'What is the process of converting glucose into energy called?',
        options: [
          'Photosynthesis',
          'Cellular respiration',
          'Fermentation',
          'Metabolism',
          'Digestion',
        ],
        correctAnswers: ['Cellular respiration'],
      },
      {
        questionText:
          'What type of bond holds the two strands of DNA together?',
        options: [
          'Ionic bond',
          'Covalent bond',
          'Hydrogen bond',
          'Van der Waals forces',
          'Peptide bond',
        ],
        correctAnswers: ['Hydrogen bond'],
      },
      {
        questionText:
          'What structure within the nucleus is responsible for ribosome production?',
        options: [
          'Chromatin',
          'Nucleolus',
          'Nuclear envelope',
          'Nuclear pore',
          'Nuclear matrix',
        ],
        correctAnswers: ['Nucleolus'],
      },
      {
        questionText:
          'Which of the following is not a characteristic of living organisms?',
        options: [
          'Growth',
          'Reproduction',
          'Homeostasis',
          'Response to stimuli',
          'Static existence',
        ],
        correctAnswers: ['Static existence'],
      },
      {
        questionText: 'What is the role of enzymes in biological reactions?',
        options: [
          'Increase activation energy',
          'Slow down reactions',
          'Act as catalysts',
          'Change the products of reactions',
          'Degrade cellular components',
        ],
        correctAnswers: ['Act as catalysts'],
      },
      {
        questionText:
          'Which macromolecule is primarily responsible for genetic information?',
        options: [
          'Proteins',
          'Carbohydrates',
          'Lipids',
          'Nucleic acids',
          'Vitamins',
        ],
        correctAnswers: ['Nucleic acids'],
      },
      {
        questionText: 'What is the main function of the large intestine?',
        options: [
          'Absorb nutrients',
          'Digest proteins',
          'Reabsorb water and electrolytes',
          'Produce bile',
          'Store waste',
        ],
        correctAnswers: ['Reabsorb water and electrolytes'],
      },
      {
        questionText:
          'Which process describes the movement of molecules from an area of higher concentration to an area of lower concentration?',
        options: [
          'Active transport',
          'Facilitated diffusion',
          'Diffusion',
          'Osmosis',
          'Exocytosis',
        ],
        correctAnswers: ['Diffusion'],
      },
      {
        questionText: 'What are the building blocks of proteins?',
        options: [
          'Nucleotides',
          'Fatty acids',
          'Amino acids',
          'Monosaccharides',
          'Glycerol',
        ],
        correctAnswers: ['Amino acids'],
      },
      {
        questionText: 'What is the primary purpose of cellular respiration?',
        options: [
          'To produce glucose',
          'To generate ATP',
          'To store energy',
          'To synthesize proteins',
          'To remove waste',
        ],
        correctAnswers: ['To generate ATP'],
      },
      {
        questionText:
          'What type of cell division results in two identical daughter cells?',
        options: [
          'Mitosis',
          'Meiosis',
          'Binary fission',
          'Budding',
          'Fragmentation',
        ],
        correctAnswers: ['Mitosis'],
      },
      {
        questionText: 'What is the primary function of mitochondria?',
        options: [
          'Photosynthesis',
          'Energy production',
          'Protein synthesis',
          'Genetic material storage',
          'Cell division',
        ],
        correctAnswers: ['Energy production'],
      },
      {
        questionText: 'What is the difference between DNA and RNA?',
        options: [
          'DNA is single-stranded; RNA is double-stranded',
          'DNA contains ribose; RNA contains deoxyribose',
          'RNA is involved in protein synthesis; DNA stores genetic information',
          'DNA has uracil; RNA has thymine',
          'They are identical in structure and function',
        ],
        correctAnswers: [
          'RNA is involved in protein synthesis; DNA stores genetic information',
        ],
      },
      {
        questionText: 'What is the role of chlorophyll in photosynthesis?',
        options: [
          'Absorbs sunlight',
          'Synthesizes glucose',
          'Releases oxygen',
          'Transports water',
          'Stores energy',
        ],
        correctAnswers: ['Absorbs sunlight'],
      },
      {
        questionText:
          'Which organelle is responsible for detoxifying harmful substances in the cell?',
        options: [
          'Smooth endoplasmic reticulum',
          'Rough endoplasmic reticulum',
          'Golgi apparatus',
          'Lysosome',
          'Mitochondria',
        ],
        correctAnswers: ['Smooth endoplasmic reticulum'],
      },
      {
        questionText:
          'What is the term for a group of organisms of the same species living in a specific area?',
        options: ['Ecosystem', 'Community', 'Population', 'Biome', 'Habitat'],
        correctAnswers: ['Population'],
      },
      {
        questionText: 'What is homeostasis?',
        options: [
          'The ability to maintain a stable internal environment',
          'The process of evolution',
          'The growth of an organism',
          'The process of cellular respiration',
          'The division of cells',
        ],
        correctAnswers: [
          'The ability to maintain a stable internal environment',
        ],
      },
      {
        questionText:
          'Which of the following is an example of a eukaryotic organism?',
        options: [
          'Bacteria',
          'Archaea',
          'Fungi',
          'Viruses',
          'All of the above',
        ],
        correctAnswers: ['Fungi'],
      },
      {
        questionText: 'What is the primary function of the immune system?',
        options: [
          'Digestion',
          'Energy production',
          'Defense against pathogens',
          'Growth and development',
          'Nutrient absorption',
        ],
        correctAnswers: ['Defense against pathogens'],
      },
    ],
    'Shakespeare Plays': [
      {
        questionText: 'In which play does the character of Othello appear?',
        options: [
          'Othello',
          'Macbeth',
          'King Lear',
          'Romeo and Juliet',
          'Hamlet',
        ],
        correctAnswers: ['Othello'],
      },
      {
        questionText: 'What is the main theme of the play "Macbeth"?',
        options: [
          'Love and betrayal',
          'Power and ambition',
          'Fate and destiny',
          'Revenge and justice',
          'Wisdom and folly',
        ],
        correctAnswers: ['Power and ambition'],
      },
      {
        questionText: 'Who is the author of the play "Romeo and Juliet"?',
        options: [
          'Charles Dickens',
          'William Shakespeare',
          'George Bernard Shaw',
          'Mark Twain',
          'J.K. Rowling',
        ],
        correctAnswers: ['William Shakespeare'],
      },
      {
        questionText:
          'In which play does the character of Lady Macbeth appear?',
        options: [
          'Othello',
          'Hamlet',
          'Macbeth',
          "A Midsummer Night's Dream",
          'The Tempest',
        ],
        correctAnswers: ['Macbeth'],
      },
      {
        questionText: 'What are the supernatural beings in "Macbeth" called?',
        options: ['Witches', 'Fairies', 'Ghosts', 'Angels', 'Demons'],
        correctAnswers: ['Witches'],
      },
      {
        questionText:
          'Which character in "Romeo and Juliet" is known for the line "A plague o\' both your houses!"?',
        options: ['Romeo', 'Juliet', 'Mercutio', 'Benvolio', 'Tybalt'],
        correctAnswers: ['Mercutio'],
      },
      {
        questionText: 'What is the main conflict in "Hamlet"?',
        options: [
          'Love vs. hate',
          'Revenge vs. justice',
          'Family vs. duty',
          'Life vs. death',
          'Reality vs. appearance',
        ],
        correctAnswers: ['Revenge vs. justice'],
      },
      {
        questionText:
          'Which play features the characters of Beatrice and Benedick?',
        options: [
          'Much Ado About Nothing',
          'The Tempest',
          'King Lear',
          'Julius Caesar',
          'Twelfth Night',
        ],
        correctAnswers: ['Much Ado About Nothing'],
      },
      {
        questionText: 'In "The Tempest," who is the rightful Duke of Milan?',
        options: ['Prospero', 'Caliban', 'Ferdinand', 'Ariel', 'Antonio'],
        correctAnswers: ['Prospero'],
      },
      {
        questionText: 'What does King Lear divide among his daughters?',
        options: ['Land', 'Money', 'Power', 'Love', 'Titles'],
        correctAnswers: ['Land'],
      },
      {
        questionText:
          'In which play is the phrase "To be, or not to be" found?',
        options: [
          'Macbeth',
          'Hamlet',
          'Julius Caesar',
          'Othello',
          'The Merchant of Venice',
        ],
        correctAnswers: ['Hamlet'],
      },
      {
        questionText: "Who kills Julius Caesar in Shakespeare's play?",
        options: ['Brutus', 'Cassius', 'Mark Antony', 'Octavius', 'Calpurnia'],
        correctAnswers: ['Brutus'],
      },
      {
        questionText:
          'What is the central theme of "A Midsummer Night\'s Dream"?',
        options: [
          'Love and magic',
          'War and peace',
          'Fate and free will',
          'Power and betrayal',
          'Wisdom and folly',
        ],
        correctAnswers: ['Love and magic'],
      },
      {
        questionText:
          'Which character in "The Merchant of Venice" is known for the quote "The quality of mercy is not strained"?',
        options: ['Shylock', 'Portia', 'Bassanio', 'Gratiano', 'Antonio'],
        correctAnswers: ['Portia'],
      },
      {
        questionText:
          'What is the name of the fairy king in "A Midsummer Night\'s Dream"?',
        options: ['Puck', 'Titania', 'Oberon', 'Ferdinand', 'Theseus'],
        correctAnswers: ['Oberon'],
      },
      {
        questionText:
          'In "Much Ado About Nothing," which characters are known for their witty banter?',
        options: [
          'Benedick and Beatrice',
          'Romeo and Juliet',
          'Othello and Desdemona',
          'Hamlet and Ophelia',
          'Portia and Bassanio',
        ],
        correctAnswers: ['Benedick and Beatrice'],
      },
      {
        questionText: 'Who is the antagonist in "Othello"?',
        options: ['Iago', 'Desdemona', 'Cassio', 'Roderigo', 'Othello'],
        correctAnswers: ['Iago'],
      },
      {
        questionText: 'In "King Lear," who are Lear\'s two disloyal daughters?',
        options: [
          'Goneril and Regan',
          'Cordelia and Goneril',
          'Regan and Cordelia',
          'Edmund and Goneril',
          'Edmund and Regan',
        ],
        correctAnswers: ['Goneril and Regan'],
      },
      {
        questionText: 'Which play features a shipwreck on a mysterious island?',
        options: [
          'The Tempest',
          'King Lear',
          'Hamlet',
          'Othello',
          'Twelfth Night',
        ],
        correctAnswers: ['The Tempest'],
      },
      {
        questionText:
          'In "Twelfth Night," what is the name of the shipwrecked heroine?',
        options: ['Viola', 'Olivia', 'Maria', 'Celia', 'Isabella'],
        correctAnswers: ['Viola'],
      },
      {
        questionText:
          'Who delivers the famous line "All the world\'s a stage"?',
        options: ['Prospero', 'Hamlet', 'Jaques', 'Oberon', 'Shylock'],
        correctAnswers: ['Jaques'],
      },
      {
        questionText:
          'In "The Tempest," who is the spirit that serves Prospero?',
        options: ['Ariel', 'Caliban', 'Ferdinand', 'Gonzalo', 'Antonio'],
        correctAnswers: ['Ariel'],
      },
      {
        questionText: 'What is the central conflict in "Othello"?',
        options: [
          'Jealousy and betrayal',
          'Love and sacrifice',
          'War and peace',
          'Family and duty',
          'Power and ambition',
        ],
        correctAnswers: ['Jealousy and betrayal'],
      },
      {
        questionText:
          'In "Julius Caesar," what does Caesar say to the Ides of March?',
        options: [
          'Beware',
          'Fear not',
          'I am Caesar',
          'Et tu, Brute?',
          'The die is cast',
        ],
        correctAnswers: ['Beware'],
      },
      {
        questionText:
          'Which character disguises herself as a boy in "Twelfth Night"?',
        options: ['Olivia', 'Viola', 'Celia', 'Maria', 'Feste'],
        correctAnswers: ['Viola'],
      },
      {
        questionText: 'In "Macbeth," who is the last king of Scotland?',
        options: ['Malcolm', 'Duncan', 'Macbeth', 'Fleance', 'Banquo'],
        correctAnswers: ['Malcolm'],
      },
      {
        questionText: "What tragic flaw leads to Macbeth's downfall?",
        options: ['Ambition', 'Greed', 'Love', 'Jealousy', 'Wrath'],
        correctAnswers: ['Ambition'],
      },
      {
        questionText:
          'In "King Lear," what does Lear carry to symbolize his madness?',
        options: ['A crown', 'A map', 'A staff', 'A sword', 'A flower'],
        correctAnswers: ['A staff'],
      },
      {
        questionText: 'Who is the rightful heir to the throne in "Macbeth"?',
        options: ['Duncan', 'Malcolm', 'Fleance', 'Banquo', 'Donalbain'],
        correctAnswers: ['Malcolm'],
      },
      {
        questionText: 'In "Hamlet," what is the name of Hamlet\'s mother?',
        options: ['Ophelia', 'Gertrude', 'Polonia', 'Juliet', 'Cordelia'],
        correctAnswers: ['Gertrude'],
      },
      {
        questionText: 'In "Othello," what is Desdemona falsely accused of?',
        options: ['Adultery', 'Murder', 'Theft', 'Treason', 'Fraud'],
        correctAnswers: ['Adultery'],
      },
      {
        questionText:
          'Which Shakespearean play features the character of Prospero?',
        options: ['The Tempest', 'Hamlet', 'King Lear', 'Othello', 'Macbeth'],
        correctAnswers: ['The Tempest'],
      },
      {
        questionText:
          'In "Romeo and Juliet," which family is feuding with the Montagues?',
        options: [
          'The Capulets',
          'The Lancasters',
          'The Tybalts',
          'The Mercutios',
          'The Benvolios',
        ],
        correctAnswers: ['The Capulets'],
      },
      {
        questionText:
          'What is the significance of the character Puck in "A Midsummer Night\'s Dream"?',
        options: [
          'He is a fairy who causes chaos',
          'He is the ruler of the fairies',
          'He is a prince in disguise',
          "He is a jester in the king's court",
          'He is a tragic hero',
        ],
        correctAnswers: ['He is a fairy who causes chaos'],
      },
    ],
    'Capitals of the World': [
      {
        questionText: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid', 'Rome'],
        correctAnswers: ['Paris'],
      },
      {
        questionText: 'What is the capital of Japan?',
        options: ['Beijing', 'Seoul', 'Tokyo', 'Hanoi', 'Manila'],
        correctAnswers: ['Tokyo'],
      },
      {
        questionText: 'What is the capital of Germany?',
        options: ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt'],
        correctAnswers: ['Berlin'],
      },
      {
        questionText: 'What is the capital of Italy?',
        options: ['Rome', 'Milan', 'Naples', 'Venice', 'Florence'],
        correctAnswers: ['Rome'],
      },
      {
        questionText: 'What is the capital of Spain?',
        options: ['Barcelona', 'Madrid', 'Valencia', 'Seville', 'Malaga'],
        correctAnswers: ['Madrid'],
      },
      {
        questionText: 'What is the capital of Canada?',
        options: ['Toronto', 'Ottawa', 'Vancouver', 'Montreal', 'Calgary'],
        correctAnswers: ['Ottawa'],
      },
      {
        questionText: 'What is the capital of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane', 'Perth'],
        correctAnswers: ['Canberra'],
      },
      {
        questionText: 'What is the capital of India?',
        options: ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai'],
        correctAnswers: ['Delhi'],
      },
      {
        questionText: 'What is the capital of Brazil?',
        options: [
          'Rio de Janeiro',
          'São Paulo',
          'Brasília',
          'Salvador',
          'Fortaleza',
        ],
        correctAnswers: ['Brasília'],
      },
      {
        questionText: 'What is the capital of Russia?',
        options: [
          'Moscow',
          'Saint Petersburg',
          'Novosibirsk',
          'Yekaterinburg',
          'Kazan',
        ],
        correctAnswers: ['Moscow'],
      },
      {
        questionText: 'What is the capital of China?',
        options: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Chengdu'],
        correctAnswers: ['Beijing'],
      },
      {
        questionText: 'What is the capital of Mexico?',
        options: [
          'Cancún',
          'Guadalajara',
          'Tijuana',
          'Mexico City',
          'Monterrey',
        ],
        correctAnswers: ['Mexico City'],
      },
      {
        questionText: 'What is the capital of the United Kingdom?',
        options: ['London', 'Edinburgh', 'Cardiff', 'Belfast', 'Glasgow'],
        correctAnswers: ['London'],
      },
      {
        questionText: 'What is the capital of Egypt?',
        options: ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan'],
        correctAnswers: ['Cairo'],
      },
      {
        questionText: 'What is the capital of Turkey?',
        options: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'],
        correctAnswers: ['Ankara'],
      },
      {
        questionText: 'What is the capital of South Africa?',
        options: [
          'Cape Town',
          'Pretoria',
          'Johannesburg',
          'Durban',
          'Bloemfontein',
        ],
        correctAnswers: ['Pretoria'],
      },
      {
        questionText: 'What is the capital of Thailand?',
        options: ['Bangkok', 'Chiang Mai', 'Phuket', 'Krabi', 'Pattaya'],
        correctAnswers: ['Bangkok'],
      },
      {
        questionText: 'What is the capital of Argentina?',
        options: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata'],
        correctAnswers: ['Buenos Aires'],
      },
      {
        questionText: 'What is the capital of Nigeria?',
        options: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano'],
        correctAnswers: ['Abuja'],
      },
      {
        questionText: 'What is the capital of Saudi Arabia?',
        options: ['Riyadh', 'Jeddah', 'Mecca', 'Dammam', 'Khobar'],
        correctAnswers: ['Riyadh'],
      },
      {
        questionText: 'What is the capital of Vietnam?',
        options: ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Nha Trang', 'Hue'],
        correctAnswers: ['Hanoi'],
      },
      {
        questionText: 'What is the capital of Greece?',
        options: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa'],
        correctAnswers: ['Athens'],
      },
      {
        questionText: 'What is the capital of Sweden?',
        options: ['Stockholm', 'Gothenburg', 'Malmo', 'Uppsala', 'Västerås'],
        correctAnswers: ['Stockholm'],
      },
      {
        questionText: 'What is the capital of Finland?',
        options: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu'],
        correctAnswers: ['Helsinki'],
      },
      {
        questionText: 'What is the capital of Norway?',
        options: ['Oslo', 'Bergen', 'Stavanger', 'Drammen', 'Trondheim'],
        correctAnswers: ['Oslo'],
      },
      {
        questionText: 'What is the capital of Denmark?',
        options: ['Copenhagen', 'Aarhus', 'Odense', 'Esbjerg', 'Randers'],
        correctAnswers: ['Copenhagen'],
      },
      {
        questionText: 'What is the capital of Portugal?',
        options: ['Lisbon', 'Porto', 'Braga', 'Coimbra', 'Funchal'],
        correctAnswers: ['Lisbon'],
      },
      {
        questionText: 'What is the capital of Israel?',
        options: ['Jerusalem', 'Tel Aviv', 'Haifa', 'Nazareth', 'Eilat'],
        correctAnswers: ['Jerusalem'],
      },
      {
        questionText: 'What is the capital of the Philippines?',
        options: [
          'Manila',
          'Quezon City',
          'Cebu City',
          'Davao City',
          'Iloilo City',
        ],
        correctAnswers: ['Manila'],
      },
      {
        questionText: 'What is the capital of Malaysia?',
        options: ['Kuala Lumpur', 'Penang', 'Malacca', 'Johor Bahru', 'Sabah'],
        correctAnswers: ['Kuala Lumpur'],
      },
      {
        questionText: 'What is the capital of Chile?',
        options: [
          'Santiago',
          'Valparaíso',
          'Concepción',
          'La Serena',
          'Antofagasta',
        ],
        correctAnswers: ['Santiago'],
      },
      {
        questionText: 'What is the capital of Colombia?',
        options: ['Bogotá', 'Medellín', 'Cali', 'Cartagena', 'Barranquilla'],
        correctAnswers: ['Bogotá'],
      },
      {
        questionText: 'What is the capital of Peru?',
        options: ['Lima', 'Arequipa', 'Trujillo', 'Cusco', 'Piura'],
        correctAnswers: ['Lima'],
      },
      {
        questionText: 'What is the capital of Iraq?',
        options: ['Baghdad', 'Basra', 'Mosul', 'Erbil', 'Sulaymaniyah'],
        correctAnswers: ['Baghdad'],
      },
      {
        questionText: 'What is the capital of Syria?',
        options: ['Damascus', 'Aleppo', 'Homs', 'Latakia', 'Tartus'],
        correctAnswers: ['Damascus'],
      },
      {
        questionText: 'What is the capital of Afghanistan?',
        options: ['Kabul', 'Kandahar', 'Herat', 'Mazar-i-Sharif', 'Jalalabad'],
        correctAnswers: ['Kabul'],
      },
      {
        questionText: 'What is the capital of Belarus?',
        options: ['Minsk', 'Gomel', 'Mogilev', 'Vitebsk', 'Brest'],
        correctAnswers: ['Minsk'],
      },
      {
        questionText: 'What is the capital of Ukraine?',
        options: ['Kyiv', 'Lviv', 'Odessa', 'Kharkiv', 'Dnipro'],
        correctAnswers: ['Kyiv'],
      },
      {
        questionText: 'What is the capital of Russia?',
        options: [
          'Moscow',
          'St. Petersburg',
          'Novosibirsk',
          'Yekaterinburg',
          'Kazan',
        ],
        correctAnswers: ['Moscow'],
      },
    ],
    'Latest Technology Trends': [
      {
        questionText:
          'Which technology is most associated with AI and machine learning?',
        options: [
          'Blockchain',
          'Cloud Computing',
          'Big Data',
          'Neural Networks',
          'Internet of Things',
        ],
        correctAnswers: ['Neural Networks'],
      },
      {
        questionText: 'What is the primary language used for web development?',
        options: ['Python', 'Java', 'JavaScript', 'C++', 'Ruby'],
        correctAnswers: ['JavaScript'],
      },
      {
        questionText: 'Which of the following is a cloud service provider?',
        options: [
          'Microsoft Azure',
          'Adobe Photoshop',
          'Visual Studio Code',
          'Slack',
          'Zoom',
        ],
        correctAnswers: ['Microsoft Azure'],
      },
      {
        questionText: 'What does IoT stand for?',
        options: [
          'Internet of Things',
          'Internet of Technology',
          'Internal Operating Tools',
          'Information of Things',
          'Interconnected Online Tools',
        ],
        correctAnswers: ['Internet of Things'],
      },
      {
        questionText: 'Which technology is used for secure transactions?',
        options: [
          'Blockchain',
          'Cloud Computing',
          'Machine Learning',
          'Augmented Reality',
          'Virtual Reality',
        ],
        correctAnswers: ['Blockchain'],
      },
      {
        questionText: 'Which of these is a key benefit of cloud computing?',
        options: [
          'Increased security',
          'Physical hardware requirements',
          'Scalability',
          'Limited access',
          'Inflexibility',
        ],
        correctAnswers: ['Scalability'],
      },
      {
        questionText: 'What does AI stand for?',
        options: [
          'Artificial Intelligence',
          'Automated Interface',
          'Advanced Integration',
          'Artificial Integration',
          'Automatic Intelligence',
        ],
        correctAnswers: ['Artificial Intelligence'],
      },
      {
        questionText: 'Which of these is an example of Big Data?',
        options: [
          'A single database',
          'Social media data',
          'An Excel spreadsheet',
          'A simple text file',
          'A local server',
        ],
        correctAnswers: ['Social media data'],
      },
      {
        questionText: 'What is the primary function of a VPN?',
        options: [
          'To speed up internet connections',
          'To protect user privacy',
          'To enable file sharing',
          'To enhance graphics performance',
          'To monitor network traffic',
        ],
        correctAnswers: ['To protect user privacy'],
      },
      {
        questionText: 'Which of the following is a programming paradigm?',
        options: [
          'Object-Oriented Programming',
          'Networking',
          'Database Management',
          'Web Development',
          'Cloud Services',
        ],
        correctAnswers: ['Object-Oriented Programming'],
      },
      {
        questionText:
          'Which technology is most commonly associated with virtual reality?',
        options: [
          'Wearable devices',
          'Headsets',
          'Smartphones',
          'Laptops',
          'Drones',
        ],
        correctAnswers: ['Headsets'],
      },
      {
        questionText:
          'Which of the following is NOT a type of machine learning?',
        options: [
          'Supervised learning',
          'Unsupervised learning',
          'Reinforcement learning',
          'Preprogrammed learning',
          'Semi-supervised learning',
        ],
        correctAnswers: ['Preprogrammed learning'],
      },
      {
        questionText:
          'Which technology allows users to interact with digital content in a real-world environment?',
        options: [
          'Virtual Reality',
          'Augmented Reality',
          'Mixed Reality',
          '3D Printing',
          'Cloud Computing',
        ],
        correctAnswers: ['Augmented Reality'],
      },
      {
        questionText: 'What is the primary purpose of a firewall?',
        options: [
          'To manage server load',
          'To protect networks from unauthorized access',
          'To improve internet speed',
          'To analyze data',
          'To create backups',
        ],
        correctAnswers: ['To protect networks from unauthorized access'],
      },
      {
        questionText:
          'Which of the following is a benefit of using open-source software?',
        options: [
          'Increased costs',
          'Less customization',
          'Community support',
          'Limited access',
          'No updates',
        ],
        correctAnswers: ['Community support'],
      },
      {
        questionText:
          'Which term refers to the practice of improving the performance of a website?',
        options: [
          'SEO (Search Engine Optimization)',
          'PPC (Pay Per Click)',
          'Content Marketing',
          'Email Marketing',
          'Social Media Marketing',
        ],
        correctAnswers: ['SEO (Search Engine Optimization)'],
      },
      {
        questionText:
          'Which programming language is commonly used for data analysis?',
        options: ['JavaScript', 'C++', 'Python', 'Ruby', 'HTML'],
        correctAnswers: ['Python'],
      },
      {
        questionText:
          'Which technology is primarily used to store large amounts of unstructured data?',
        options: [
          'Relational databases',
          'Data warehouses',
          'NoSQL databases',
          'Spreadsheets',
          'Text files',
        ],
        correctAnswers: ['NoSQL databases'],
      },
      {
        questionText: 'What does the term “5G” refer to?',
        options: [
          'Fifth generation of mobile networks',
          'Fifth generation of computer hardware',
          'Fifth generation of gaming consoles',
          'Fifth generation of software development',
          'Fifth generation of Wi-Fi technology',
        ],
        correctAnswers: ['Fifth generation of mobile networks'],
      },
      {
        questionText:
          'Which company is known for developing the iOS operating system?',
        options: ['Google', 'Microsoft', 'Apple', 'IBM', 'Samsung'],
        correctAnswers: ['Apple'],
      },
      {
        questionText: 'Which of these is a popular version control system?',
        options: ['Git', 'Bitbucket', 'Trello', 'Jira', 'Slack'],
        correctAnswers: ['Git'],
      },
      {
        questionText: 'What is the main function of an API?',
        options: [
          'To store data',
          'To provide a set of rules for software interactions',
          'To create user interfaces',
          'To manage database connections',
          'To enhance graphic design',
        ],
        correctAnswers: ['To provide a set of rules for software interactions'],
      },
      {
        questionText:
          'Which technology is used to analyze data trends and patterns?',
        options: [
          'Data Mining',
          'Data Entry',
          'Data Storage',
          'Data Collection',
          'Data Formatting',
        ],
        correctAnswers: ['Data Mining'],
      },
      {
        questionText: 'What does the acronym “SaaS” stand for?',
        options: [
          'Software as a Service',
          'System as a Service',
          'Service as a Software',
          'Storage as a Service',
          'Security as a Service',
        ],
        correctAnswers: ['Software as a Service'],
      },
      {
        questionText: 'Which of these is a prominent blockchain platform?',
        options: ['Ethereum', 'MySQL', 'MongoDB', 'Oracle', 'PostgreSQL'],
        correctAnswers: ['Ethereum'],
      },
      {
        questionText: 'What is the primary goal of digital transformation?',
        options: [
          'To reduce costs',
          'To improve customer experience',
          'To create more jobs',
          'To minimize technology use',
          'To eliminate competition',
        ],
        correctAnswers: ['To improve customer experience'],
      },
      {
        questionText: 'What is the main feature of a chat bot?',
        options: [
          'Data storage',
          'Automated customer interaction',
          'Graphics processing',
          'Video conferencing',
          'Database management',
        ],
        correctAnswers: ['Automated customer interaction'],
      },
      {
        questionText:
          'Which of the following is a technique used in data encryption?',
        options: [
          'Hashing',
          'Fragmenting',
          'Compressing',
          'Mirroring',
          'Copying',
        ],
        correctAnswers: ['Hashing'],
      },
      {
        questionText: 'What is the main purpose of machine learning?',
        options: [
          'To program computers to perform tasks',
          'To analyze data',
          'To enable computers to learn from data',
          'To enhance user interfaces',
          'To build websites',
        ],
        correctAnswers: ['To enable computers to learn from data'],
      },
      {
        questionText:
          'Which of the following is a benefit of using AI in customer service?',
        options: [
          'Decreased efficiency',
          '24/7 availability',
          'Increased waiting time',
          'Less accuracy',
          'Reduced data analysis',
        ],
        correctAnswers: ['24/7 availability'],
      },
    ],
  };

  // Insert questions for each quiz and update the quiz with question IDs
  for (const quiz of quizzes) {
    // Prepare the questions to insert, including the reference to the quiz
    const questions = quizQuestions[quiz.title].map((q) => ({
      quiz: quiz._id, // Set the quiz reference
      ...q,
    }));

    // Insert questions into the database
    const insertedQuestions = await Question.insertMany(questions);

    // Update the quiz with the IDs of the inserted questions
    await Quiz.findByIdAndUpdate(quiz._id, {
      questions: insertedQuestions.map((q) => q._id), // Map to get only the question IDs
    });
  }

  console.log('Questions inserted');
  mongoose.disconnect();
};

seedDatabase();
