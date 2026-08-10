"use strict";

const questions = [
    {
        category: "QUR'AN",
        question: "How many Surahs are in the Qur'an?",
        answers: ["114"],
        correct: "114",
        explanation: "The Qur'an contains 114 Surahs."
    },

    {
        category: "QUR'AN",
        question: "What is the first Surah of the Qur'an?",
        answers: ["al fatihah", "alfatihah", "fatiha"],
        correct: "Al-Fatihah",
        explanation: "Al-Fatihah is the opening Surah of the Qur'an."
    },

    {
        category: "QUR'AN",
        question: "What is the longest Surah in the Qur'an?",
        answers: ["al baqarah", "albaqarah", "baqarah"],
        correct: "Al-Baqarah",
        explanation: "Al-Baqarah is the longest Surah in the Qur'an."
    },

    {
        category: "QUR'AN",
        question: "What is the shortest Surah in the Qur'an?",
        answers: ["al kawthar", "alkawthar", "kawthar"],
        correct: "Al-Kawthar",
        explanation: "Al-Kawthar is the shortest Surah in the Qur'an."
    },

    {
        category: "QUR'AN",
        question: "Which Surah is known as the Heart of the Qur'an?",
        answers: ["yasin", "ya sin", "surah yasin"],
        correct: "Surah Ya-Sin",
        explanation: "Ya-Sin is commonly referred to as the Heart of the Qur'an."
    },

    {
        category: "PROPHETS",
        question: "Who was the first human being?",
        answers: ["adam", "adam alayhis salam"],
        correct: "Adam عليه السلام",
        explanation: "Adam عليه السلام was the first human being."
    },

    {
        category: "PROPHETS",
        question: "Which prophet built the Ark?",
        answers: ["nuh", "noah", "nuh alayhis salam"],
        correct: "Nuh عليه السلام",
        explanation: "Allah commanded Nuh عليه السلام to build the Ark."
    },

    {
        category: "PROPHETS",
        question: "Which prophet was thrown into a fire but Allah saved him?",
        answers: ["ibrahim", "abraham", "ibrahim alayhis salam"],
        correct: "Ibrahim عليه السلام",
        explanation: "Allah saved Ibrahim عليه السلام from the fire."
    },

    {
        category: "PROPHETS",
        question: "Which prophet was swallowed by a great fish?",
        answers: ["yunus", "jonah", "yunus alayhis salam"],
        correct: "Yunus عليه السلام",
        explanation: "Yunus عليه السلام was swallowed by the great fish."
    },

    {
        category: "PROPHETS",
        question: "Which prophet was given the Zabur?",
        answers: ["dawud", "david", "dawud alayhis salam"],
        correct: "Dawud عليه السلام",
        explanation: "Allah gave the Zabur to Dawud عليه السلام."
    },

    {
        category: "PROPHETS",
        question: "Which prophet was given the Injil?",
        answers: ["isa", "jesus", "isa alayhis salam"],
        correct: "Isa عليه السلام",
        explanation: "Allah gave the Injil to Isa عليه السلام."
    },

    {
        category: "PROPHETS",
        question: "Which prophet was given the Tawrah?",
        answers: ["musa", "moses", "musa alayhis salam"],
        correct: "Musa عليه السلام",
        explanation: "Allah gave the Tawrah to Musa عليه السلام."
    },

    {
        category: "PROPHETS",
        question: "Who was the final prophet and messenger of Allah?",
        answers: [
            "muhammad",
            "muhammad sallallahu alayhi wa sallam",
            "prophet muhammad"
        ],
        correct: "Prophet Muhammad ﷺ",
        explanation: "Prophet Muhammad ﷺ is the final prophet and messenger of Allah."
    },

    {
        category: "SEERAH",
        question: "In which city was Prophet Muhammad ﷺ born?",
        answers: ["makkah", "mecca"],
        correct: "Makkah",
        explanation: "Prophet Muhammad ﷺ was born in Makkah."
    },

    {
        category: "SEERAH",
        question: "What was the name of the father of Prophet Muhammad ﷺ?",
        answers: ["abdullah", "abdullah ibn abd al muttalib"],
        correct: "Abdullah",
        explanation: "His father's name was Abdullah ibn Abd al-Muttalib."
    },

    {
        category: "SEERAH",
        question: "What was the name of the mother of Prophet Muhammad ﷺ?",
        answers: ["aminah", "aminah bint wahb"],
        correct: "Aminah bint Wahb",
        explanation: "His mother was Aminah bint Wahb."
    },

    {
        category: "SEERAH",
        question: "What was the name of the first wife of Prophet Muhammad ﷺ?",
        answers: ["khadijah", "khadija", "khadijah bint khuwaylid"],
        correct: "Khadijah رضي الله عنها",
        explanation: "Khadijah رضي الله عنها was the first wife of Prophet Muhammad ﷺ."
    },

    {
        category: "SEERAH",
        question: "Where did the first revelation come to Prophet Muhammad ﷺ?",
        answers: ["cave hira", "hira", "cave of hira", "ghar hira"],
        correct: "The Cave of Hira",
        explanation: "The first revelation came to him in the Cave of Hira."
    },

    {
        category: "SEERAH",
        question: "Which angel brought revelation to Prophet Muhammad ﷺ?",
        answers: ["jibril", "gabriel", "jibreel", "jibril alayhis salam"],
        correct: "Jibril عليه السلام",
        explanation: "Jibril عليه السلام brought revelation from Allah."
    },

    {
        category: "SEERAH",
        question: "To which city did Prophet Muhammad ﷺ migrate from Makkah?",
        answers: ["madinah", "medina"],
        correct: "Madinah",
        explanation: "The Prophet ﷺ migrated from Makkah to Madinah."
    },

    {
        category: "SEERAH",
        question: "What is the migration of the Prophet ﷺ from Makkah to Madinah called?",
        answers: ["hijrah", "hijra", "migration"],
        correct: "Hijrah",
        explanation: "The migration from Makkah to Madinah is known as the Hijrah."
    },

    {
        category: "COMPANIONS",
        question: "Who was the first adult male to accept Islam?",
        answers: ["abu bakr", "abu bakr as siddiq", "abubakr"],
        correct: "Abu Bakr رضي الله عنه",
        explanation: "Abu Bakr رضي الله عنه was the first free adult male to accept Islam."
    },

    {
        category: "COMPANIONS",
        question: "Who was the second caliph of Islam?",
        answers: ["umar", "umar ibn al khattab", "umar ibn khattab"],
        correct: "Umar ibn al-Khattab رضي الله عنه",
        explanation: "Umar ibn al-Khattab رضي الله عنه was the second Rightly Guided Caliph."
    },

    {
        category: "COMPANIONS",
        question: "Who was the third Rightly Guided Caliph?",
        answers: ["uthman", "uthman ibn affan", "usman"],
        correct: "Uthman ibn Affan رضي الله عنه",
        explanation: "Uthman ibn Affan رضي الله عنه was the third Rightly Guided Caliph."
    },

    {
        category: "COMPANIONS",
        question: "Who was the fourth Rightly Guided Caliph?",
        answers: ["ali", "ali ibn abi talib", "ali ibn abu talib"],
        correct: "Ali ibn Abi Talib رضي الله عنه",
        explanation: "Ali ibn Abi Talib رضي الله عنه was the fourth Rightly Guided Caliph."
    },

    {
        category: "ISLAM",
        question: "How many obligatory prayers are there each day?",
        answers: ["5", "five"],
        correct: "Five",
        explanation: "Muslims are obligated to perform five daily prayers."
    },

    {
        category: "ISLAM",
        question: "What is the obligatory charity called?",
        answers: ["zakat", "zakah"],
        correct: "Zakat",
        explanation: "Zakat is the obligatory charity prescribed for eligible Muslims."
    },

    {
        category: "ISLAM",
        question: "What is the obligatory fasting month called?",
        answers: ["ramadan", "ramadhan"],
        correct: "Ramadan",
        explanation: "Muslims fast during the month of Ramadan."
    },

    {
        category: "ISLAM",
        question: "In which direction do Muslims face during Salah?",
        answers: ["qiblah", "qibla", "kaaba", "kabah"],
        correct: "The Qiblah toward the Ka'bah",
        explanation: "Muslims face the Qiblah, toward the Ka'bah in Makkah."
    },

    {
        category: "ISLAM",
        question: "What is the declaration of faith in Islam called?",
        answers: ["shahadah", "shahada", "shahadat"],
        correct: "Shahadah",
        explanation: "The Shahadah is the testimony of faith."
    },

    {
        category: "ISLAM",
        question: "How many pillars of Islam are there?",
        answers: ["5", "five"],
        correct: "Five",
        explanation: "Islam has five pillars."
    },

    {
        category: "ISLAM",
        question: "How many pillars of Iman are commonly taught?",
        answers: ["6", "six"],
        correct: "Six",
        explanation: "The six articles of faith include belief in Allah, His angels, His books, His messengers, the Last Day, and divine decree."
    },

    {
        category: "HADITH",
        question: "What is the term for the sayings, actions and approvals attributed to Prophet Muhammad ﷺ?",
        answers: ["hadith", "hadeeth"],
        correct: "Hadith",
        explanation: "Hadith refers to reports about the sayings, actions and approvals of the Prophet ﷺ."
    },

    {
        category: "WORSHIP",
        question: "What is the Arabic term for the ritual prayer?",
        answers: ["salah", "salat", "salaah"],
        correct: "Salah",
        explanation: "Salah is the ritual prayer performed by Muslims."
    },

    {
        category: "WORSHIP",
        question: "What is the Arabic term for fasting?",
        answers: ["sawm", "siyam", "siyam"],
        correct: "Sawm",
        explanation: "Sawm refers to fasting."
    },

    {
        category: "WORSHIP",
        question: "What is the pilgrimage to Makkah called?",
        answers: ["hajj", "haj"],
        correct: "Hajj",
        explanation: "Hajj is the pilgrimage to the Sacred House in Makkah."
    },

    {
        category: "WORSHIP",
        question: "What is the voluntary pilgrimage called?",
        answers: ["umrah", "umra"],
        correct: "Umrah",
        explanation: "Umrah is the lesser pilgrimage."
    },

    {
        category: "ISLAMIC HISTORY",
        question: "What is the sacred mosque in Makkah called?",
        answers: ["masjid al haram", "al masjid al haram", "haram"],
        correct: "Al-Masjid al-Haram",
        explanation: "Al-Masjid al-Haram surrounds the Ka'bah in Makkah."
    },

    {
        category: "ISLAMIC HISTORY",
        question: "What is the mosque in Madinah containing the Prophet's ﷺ mosque called?",
        answers: ["masjid nabawi", "al masjid an nabawi", "prophets mosque"],
        correct: "Al-Masjid an-Nabawi",
        explanation: "Al-Masjid an-Nabawi is the Prophet's Mosque in Madinah."
    },

    {
        category: "SEERAH",
        question: "What was the name of the cave in which Prophet Muhammad ﷺ and Abu Bakr رضي الله عنه took shelter during the Hijrah?",
        answers: ["thawr", "cave thawr", "cave of thawr"],
        correct: "The Cave of Thawr",
        explanation: "The Prophet ﷺ and Abu Bakr رضي الله عنه took shelter in the Cave of Thawr during the Hijrah."
    },

    {
        category: "SEERAH",
        question: "What was the name of the grandfather of Prophet Muhammad ﷺ?",
        answers: ["abd al muttalib", "abdul muttalib", "abdulmuttalib"],
        correct: "Abd al-Muttalib",
        explanation: "Abd al-Muttalib was the grandfather of Prophet Muhammad ﷺ."
    },

    {
        category: "SEERAH",
        question: "Who was the uncle of Prophet Muhammad ﷺ who protected him in Makkah?",
        answers: ["abu talib", "abu talib ibn abd al muttalib"],
        correct: "Abu Talib",
        explanation: "Abu Talib provided protection and support to the Prophet ﷺ in Makkah."
    },

    {
        category: "SEERAH",
        question: "What was the name of the foster mother who cared for Prophet Muhammad ﷺ in his early childhood?",
        answers: ["halimah", "halimah as saadiah", "halima"],
        correct: "Halimah as-Sa'diyyah",
        explanation: "Halimah as-Sa'diyyah cared for the Prophet ﷺ during his early childhood."
    },

    {
        category: "PROPHETS",
        question: "Which prophet was the father of Prophet Yusuf عليه السلام?",
        answers: ["yaqub", "jacob", "yaqub alayhis salam"],
        correct: "Ya'qub عليه السلام",
        explanation: "Ya'qub عليه السلام was the father of Yusuf عليه السلام."
    },

    {
        category: "PROPHETS",
        question: "Which prophet was known for his exceptional patience during severe trials?",
        answers: ["ayyub", "job", "ayyub alayhis salam"],
        correct: "Ayyub عليه السلام",
        explanation: "Ayyub عليه السلام is an example of remarkable patience and steadfastness."
    },

    {
        category: "PROPHETS",
        question: "Which prophet interpreted dreams while imprisoned in Egypt?",
        answers: ["yusuf", "joseph", "yusuf alayhis salam"],
        correct: "Yusuf عليه السلام",
        explanation: "Yusuf عليه السلام interpreted dreams while he was imprisoned."
    },

    {
        category: "QUR'AN",
        question: "Which month was the Qur'an first revealed in?",
        answers: ["ramadan", "ramadhan"],
        correct: "Ramadan",
        explanation: "The Qur'an was revealed during Ramadan."
    },

    {
        category: "QUR'AN",
        question: "What is the name of the night described as better than a thousand months?",
        answers: ["laylat al qadr", "laylatul qadr", "night of decree"],
        correct: "Laylat al-Qadr",
        explanation: "Laylat al-Qadr is described in the Qur'an as better than a thousand months."
    },

    {
        category: "QUR'AN",
        question: "Which angel is mentioned as carrying the revelation to the prophets?",
        answers: ["jibril", "jibreel", "gabriel"],
        correct: "Jibril عليه السلام",
        explanation: "Jibril عليه السلام is the angel associated with bringing revelation."
    },

    {
        category: "GENERAL KNOWLEDGE",
        question: "What is the Arabic word commonly used for God?",
        answers: ["allah"],
        correct: "Allah",
        explanation: "Allah is the Arabic name for God."
    },

    {
        category: "GENERAL KNOWLEDGE",
        question: "What does the word Islam refer to in its religious meaning?",
        answers: ["submission", "submission to allah", "submission to god"],
        correct: "Submission to Allah",
        explanation: "Islam conveys submission and surrender to Allah."
    },

    {
        category: "GENERAL KNOWLEDGE",
        question: "What is the Arabic term for the remembrance of Allah?",
        answers: ["dhikr", "zikr", "dhikrullah"],
        correct: "Dhikr",
        explanation: "Dhikr means remembering and mentioning Allah."
    },

    {
        category: "GENERAL KNOWLEDGE",
        question: "What is the Arabic word for supplication?",
        answers: ["dua", "duaa", "du'a"],
        correct: "Du'a",
        explanation: "Du'a means supplication or calling upon Allah."
    },

    {
        category: "SEERAH",
        question: "What was the Prophet Muhammad ﷺ known as before prophethood because of his honesty and trustworthiness?",
        answers: ["al amin", "al ameen", "ameen"],
        correct: "Al-Amin",
        explanation: "The people of Makkah knew him as Al-Amin, meaning the trustworthy."
    },

    {
        category: "SEERAH",
        question: "What was the name of the Prophet's ﷺ first muezzin?",
        answers: ["bilal", "bilal ibn rabah", "bilal ibn rabah"],
        correct: "Bilal ibn Rabah رضي الله عنه",
        explanation: "Bilal ibn Rabah رضي الله عنه was one of the famous early Muslims and the Prophet's ﷺ caller to prayer."
    },

    {
        category: "SEERAH",
        question: "Which city became the center of the Muslim community after the Hijrah?",
        answers: ["madinah", "medina"],
        correct: "Madinah",
        explanation: "Madinah became the center of the Muslim community after the Hijrah."
    },

    {
        category: "COMPANIONS",
        question: "Who was known as the first muezzin of Islam?",
        answers: ["bilal", "bilal ibn rabah"],
        correct: "Bilal ibn Rabah رضي الله عنه",
        explanation: "Bilal رضي الله عنه was renowned for calling the adhan."
    },

    {
        category: "ISLAMIC HISTORY",
        question: "What is the first month of the Islamic calendar?",
        answers: ["muharram"],
        correct: "Muharram",
        explanation: "Muharram is the first month of the Hijri calendar."
    },

    {
        category: "ISLAMIC HISTORY",
        question: "What is the ninth month of the Islamic calendar?",
        answers: ["ramadan", "ramadhan"],
        correct: "Ramadan",
        explanation: "Ramadan is the ninth month of the Islamic calendar."
    },

    {
        category: "ISLAMIC HISTORY",
        question: "What is the twelfth month of the Islamic calendar?",
        answers: ["dhul hijjah", "dhu al hijjah", "zul hijjah"],
        correct: "Dhul-Hijjah",
        explanation: "Dhul-Hijjah is the twelfth month of the Islamic calendar."
    },

    {
        category: "GENERAL KNOWLEDGE",
        question: "How many months are there in the Islamic calendar?",
        answers: ["12", "twelve"],
        correct: "12",
        explanation: "The Islamic calendar consists of twelve months."
    },

    {
        category: "QUR'AN",
        question: "Which Surah is named after Maryam, the mother of Isa عليه السلام?",
        answers: ["maryam", "surah maryam"],
        correct: "Surah Maryam",
        explanation: "Surah 19 is named Maryam."
    },

    {
        category: "QUR'AN",
        question: "Which Surah is named after the family of Imran?",
        answers: ["ali imran", "aal imran", "al imran"],
        correct: "Aal 'Imran",
        explanation: "Surah 3 is named Aal 'Imran."
    },

    {
        category: "QUR'AN",
        question: "Which Surah begins with the words 'Alhamdu lillahi Rabbil alamin'?",
        answers: ["al fatihah", "alfatihah", "fatiha"],
        correct: "Al-Fatihah",
        explanation: "Al-Fatihah begins with praise of Allah, Lord of the worlds."
    },

    {
        category: "WORSHIP",
        question: "What is the call to prayer called?",
        answers: ["adhan", "athan", "adhan"],
        correct: "Adhan",
        explanation: "The Adhan is the call announcing the time of prayer."
    },

    {
        category: "WORSHIP",
        question: "What is the shorter call made immediately before the congregational prayer begins?",
        answers: ["iqamah", "iqama"],
        correct: "Iqamah",
        explanation: "The Iqamah announces that the congregational prayer is about to begin."
    },

    {
        category: "SEERAH",
        question: "What was the name of the Prophet Muhammad's ﷺ mother?",
        answers: ["aminah", "aminah bint wahb"],
        correct: "Aminah bint Wahb",
        explanation: "Aminah bint Wahb was the mother of Prophet Muhammad ﷺ."
    },

    {
        category: "SEERAH",
        question: "What was the name of the Prophet Muhammad's ﷺ father?",
        answers: ["abdullah"],
        correct: "Abdullah",
        explanation: "Abdullah ibn Abd al-Muttalib was the father of Prophet Muhammad ﷺ."
    },

    {
        category: "SEERAH",
        question: "What was the name of the first horse owned by Prophet Muhammad ﷺ?",
        answers: ["al sakb", "alsakb", "sakb", "as sakb"],
        correct: "Al-Sakb",
        explanation: "Al-Sakb is reported in historical works as the first horse owned by the Prophet ﷺ."
    },
       {
        category: "QUR'AN",
        question: "Which Surah is known as Umm al-Kitab?",
        answers: ["al fatihah", "alfatihah", "fatiha"],
        correct: "Al-Fatihah",
        explanation: "Al-Fatihah is known as Umm al-Kitab."
    },

    {
        category: "QUR'AN",
        question: "Which Surah contains Ayat al-Kursi?",
        answers: ["al baqarah", "albaqarah", "baqarah"],
        correct: "Al-Baqarah",
        explanation: "Ayat al-Kursi is verse 255 of Surah Al-Baqarah."
    },

    {
        category: "QUR'AN",
        question: "Which Surah is number 112 in the Qur'an?",
        answers: ["al ikhlas", "al ikhlaas", "ikhlas"],
        correct: "Al-Ikhlas",
        explanation: "Surah Al-Ikhlas is the 112th Surah."
    },

    {
        category: "QUR'AN",
        question: "Which Surah is number 113?",
        answers: ["al falaq", "alfalaq", "falaq"],
        correct: "Al-Falaq",
        explanation: "Al-Falaq is the 113th Surah."
    },

    {
        category: "QUR'AN",
        question: "Which Surah is number 114?",
        answers: ["an nas", "an nas", "nas"],
        correct: "An-Nas",
        explanation: "An-Nas is the 114th and final Surah."
    },

    {
        category: "QUR'AN",
        question: "How many Juz are in the Qur'an?",
        answers: ["30", "thirty"],
        correct: "30",
        explanation: "The Qur'an is divided into 30 Juz."
    },

    {
        category: "QUR'AN",
        question: "What is the Arabic term commonly used for a verse of the Qur'an?",
        answers: ["ayah", "aya", "ayat"],
        correct: "Ayah",
        explanation: "Ayah means a verse or sign."
    },

    {
        category: "QUR'AN",
        question: "What is the Arabic term for a chapter of the Qur'an?",
        answers: ["surah", "sura"],
        correct: "Surah",
        explanation: "Each chapter of the Qur'an is called a Surah."
    },

    {
        category: "PROPHETS",
        question: "Who was the father of Prophet Ibrahim عليه السلام according to the Qur'an?",
        answers: ["azar", "azar"],
        correct: "Azar",
        explanation: "The Qur'an mentions Azar in connection with Ibrahim عليه السلام."
    },

    {
        category: "PROPHETS",
        question: "Which prophet was raised to Allah according to the Qur'an?",
        answers: ["isa", "jesus", "isa alayhis salam"],
        correct: "Isa عليه السلام",
        explanation: "The Qur'an states that Allah raised Isa عليه السلام to Himself."
    },

    {
        category: "PROPHETS",
        question: "Which prophet was known for his beautiful voice when reciting the Zabur?",
        answers: ["dawud", "david", "dawud alayhis salam"],
        correct: "Dawud عليه السلام",
        explanation: "Dawud عليه السلام was given a beautiful voice and the Zabur."
    },

    {
        category: "PROPHETS",
        question: "Which prophet was given control over the wind by Allah?",
        answers: ["sulayman", "sulaiman", "solomon"],
        correct: "Sulayman عليه السلام",
        explanation: "Allah gave Sulayman عليه السلام extraordinary authority, including control of the wind."
    },

    {
        category: "PROPHETS",
        question: "Which prophet was the son of Ya'qub عليه السلام and became a ruler in Egypt?",
        answers: ["yusuf", "joseph", "yusuf alayhis salam"],
        correct: "Yusuf عليه السلام",
        explanation: "Yusuf عليه السلام eventually became a person of authority in Egypt."
    },

    {
        category: "PROPHETS",
        question: "Which prophet spoke to Allah directly according to Islamic tradition?",
        answers: ["musa", "moses", "musa alayhis salam"],
        correct: "Musa عليه السلام",
        explanation: "Musa عليه السلام is known as Kalimullah, the one who spoke with Allah."
    },

    {
        category: "PROPHETS",
        question: "Which prophet's people were punished by a mighty wind?",
        answers: ["hud", "hud alayhis salam"],
        correct: "Hud عليه السلام",
        explanation: "The people of 'Ad rejected Hud عليه السلام and were punished by a powerful wind."
    },

    {
        category: "PROPHETS",
        question: "Which prophet was sent to the people of Thamud?",
        answers: ["salih", "saleh", "salih alayhis salam"],
        correct: "Salih عليه السلام",
        explanation: "Salih عليه السلام was sent to the people of Thamud."
    },

    {
        category: "PROPHETS",
        question: "Which prophet was sent to the people of Madyan?",
        answers: ["shuayb", "shuaib", "shuayb alayhis salam"],
        correct: "Shu'ayb عليه السلام",
        explanation: "Shu'ayb عليه السلام was sent to the people of Madyan."
    },

    {
        category: "PROPHETS",
        question: "Who was the son of Prophet Ibrahim عليه السلام who was involved in the building of the Ka'bah?",
        answers: ["ismail", "ishmael", "ismail alayhis salam"],
        correct: "Ismail عليه السلام",
        explanation: "Ibrahim عليه السلام and Ismail عليه السلام raised the foundations of the Ka'bah."
    },

    {
        category: "SEERAH",
        question: "What was the name of the Prophet's ﷺ uncle who was known as Abu Lahab?",
        answers: ["abd al uzza", "abdul uzza", "abu lahab"],
        correct: "Abu Lahab",
        explanation: "Abu Lahab was an uncle of the Prophet ﷺ who strongly opposed his message."
    },

    {
        category: "SEERAH",
        question: "Which uncle of Prophet Muhammad ﷺ was martyred at the Battle of Uhud?",
        answers: ["hamzah", "hamza", "hamzah ibn abd al muttalib"],
        correct: "Hamzah رضي الله عنه",
        explanation: "Hamzah رضي الله عنه, the Prophet's ﷺ uncle, was martyred at Uhud."
    },

    {
        category: "SEERAH",
        question: "What was the name of the Prophet's ﷺ daughter who was married to Ali رضي الله عنه?",
        answers: ["fatimah", "fatima", "fatimah az zahra"],
        correct: "Fatimah رضي الله عنها",
        explanation: "Fatimah رضي الله عنها was the daughter of Prophet Muhammad ﷺ and wife of Ali رضي الله عنه."
    },

    {
        category: "SEERAH",
        question: "Which daughter of Prophet Muhammad ﷺ was married to Uthman رضي الله عنه?",
        answers: ["ruqayyah", "ruqayya"],
        correct: "Ruqayyah رضي الله عنها",
        explanation: "Ruqayyah رضي الله عنها was married to Uthman رضي الله عنه."
    },

    {
        category: "SEERAH",
        question: "Which daughter of Prophet Muhammad ﷺ was also married to Uthman رضي الله عنه after Ruqayyah رضي الله عنها passed away?",
        answers: ["umm kulthum", "umm kulthoom"],
        correct: "Umm Kulthum رضي الله عنها",
        explanation: "Umm Kulthum رضي الله عنها later married Uthman رضي الله عنه."
    },

    {
        category: "SEERAH",
        question: "What title was given to Uthman رضي الله عنه because he married two daughters of the Prophet ﷺ?",
        answers: ["dhu al nurayn", "dhun nurayn", "dhul nurayn", "possessor of two lights"],
        correct: "Dhu an-Nurayn",
        explanation: "Uthman رضي الله عنه was known as Dhu an-Nurayn, meaning 'Possessor of the Two Lights.'"
    },

    {
        category: "COMPANIONS",
        question: "Who accompanied Prophet Muhammad ﷺ during the Hijrah?",
        answers: ["abu bakr", "abu bakr as siddiq", "abubakr"],
        correct: "Abu Bakr رضي الله عنه",
        explanation: "Abu Bakr رضي الله عنه accompanied the Prophet ﷺ during the Hijrah."
    },

    {
        category: "COMPANIONS",
        question: "Who was the companion who slept in the Prophet's ﷺ bed on the night of the Hijrah?",
        answers: ["ali", "ali ibn abi talib", "ali ibn abu talib"],
        correct: "Ali ibn Abi Talib رضي الله عنه",
        explanation: "Ali رضي الله عنه slept in the Prophet's ﷺ bed as part of the plan for his safe departure."
    },

    {
        category: "COMPANIONS",
        question: "Who was the first woman to accept Islam?",
        answers: ["khadijah", "khadija", "khadijah bint khuwaylid"],
        correct: "Khadijah رضي الله عنها",
        explanation: "Khadijah رضي الله عنها was the first person to believe in and support the Prophet ﷺ."
    },

    {
        category: "COMPANIONS",
        question: "Who was known as the Sword of Allah?",
        answers: ["khalid", "khalid ibn al walid", "khalid ibn walid"],
        correct: "Khalid ibn al-Walid رضي الله عنه",
        explanation: "Khalid ibn al-Walid رضي الله عنه was famously known as the Sword of Allah."
    },

    {
        category: "COMPANIONS",
        question: "Who was known as the interpreter of the Qur'an among the companions?",
        answers: ["ibn abbas", "abdullah ibn abbas", "abdullah ibn al abbas"],
        correct: "Abdullah ibn Abbas رضي الله عنه",
        explanation: "Ibn Abbas رضي الله عنه became renowned for his knowledge and interpretation of the Qur'an."
    },

    {
        category: "COMPANIONS",
        question: "Which companion was known as the trustworthy one of this Ummah?",
        answers: ["abu ubaidah", "abu ubaidah ibn al jarrah", "abu ubaidah ibn al jarrah"],
        correct: "Abu Ubaydah ibn al-Jarrah رضي الله عنه",
        explanation: "Abu Ubaydah رضي الله عنه was famously described as the trustworthy one of this Ummah."
    },

    {
        category: "ISLAM",
        question: "What is the first pillar of Islam?",
        answers: ["shahadah", "shahada", "testimony of faith"],
        correct: "Shahadah",
        explanation: "The Shahadah is the first pillar of Islam."
    },

    {
        category: "ISLAM",
        question: "What is the second pillar of Islam?",
        answers: ["salah", "salat", "prayer"],
        correct: "Salah",
        explanation: "Salah is the second pillar of Islam."
    },

    {
        category: "ISLAM",
        question: "What is the third pillar of Islam?",
        answers: ["zakat", "zakah"],
        correct: "Zakat",
        explanation: "Zakat is the third pillar of Islam."
    },

    {
        category: "ISLAM",
        question: "What is the fourth pillar of Islam?",
        answers: ["sawm", "fasting", "siyam"],
        correct: "Sawm",
        explanation: "Fasting during Ramadan is the fourth pillar of Islam."
    },

    {
        category: "ISLAM",
        question: "What is the fifth pillar of Islam?",
        answers: ["hajj", "pilgrimage"],
        correct: "Hajj",
        explanation: "Hajj is the fifth pillar of Islam."
    },

    {
        category: "WORSHIP",
        question: "Which prayer is performed at dawn?",
        answers: ["fajr"],
        correct: "Fajr",
        explanation: "Fajr is the dawn prayer."
    },

    {
        category: "WORSHIP",
        question: "Which prayer is performed after midday?",
        answers: ["dhuhr", "zuhr"],
        correct: "Dhuhr",
        explanation: "Dhuhr is the midday prayer."
    },

    {
        category: "WORSHIP",
        question: "Which prayer is performed in the afternoon?",
        answers: ["asr", "asr prayer"],
        correct: "Asr",
        explanation: "Asr is the afternoon prayer."
    },

    {
        category: "WORSHIP",
        question: "Which prayer is performed just after sunset?",
        answers: ["maghrib"],
        correct: "Maghrib",
        explanation: "Maghrib is performed after sunset."
    },

    {
        category: "WORSHIP",
        question: "Which prayer is performed at night?",
        answers: ["isha", "isha prayer"],
        correct: "Isha",
        explanation: "Isha is the night prayer."
    },

    {
        category: "WORSHIP",
        question: "How many obligatory rak'ahs are there in Fajr?",
        answers: ["2", "two"],
        correct: "2",
        explanation: "Fajr consists of two obligatory rak'ahs."
    },

    {
        category: "WORSHIP",
        question: "How many obligatory rak'ahs are there in Dhuhr?",
        answers: ["4", "four"],
        correct: "4",
        explanation: "Dhuhr has four obligatory rak'ahs."
    },

    {
        category: "WORSHIP",
        question: "How many obligatory rak'ahs are there in Asr?",
        answers: ["4", "four"],
        correct: "4",
        explanation: "Asr has four obligatory rak'ahs."
    },

    {
        category: "WORSHIP",
        question: "How many obligatory rak'ahs are there in Maghrib?",
        answers: ["3", "three"],
        correct: "3",
        explanation: "Maghrib has three obligatory rak'ahs."
    },

    {
        category: "WORSHIP",
        question: "How many obligatory rak'ahs are there in Isha?",
        answers: ["4", "four"],
        correct: "4",
        explanation: "Isha has four obligatory rak'ahs."
    },

    {
        category: "ISLAMIC HISTORY",
        question: "What is the first month of the Hijri calendar?",
        answers: ["muharram"],
        correct: "Muharram",
        explanation: "Muharram is the first month of the Islamic calendar."
    },

    {
        category: "ISLAMIC HISTORY",
        question: "Which Islamic month contains the Day of Arafah?",
        answers: ["dhul hijjah", "dhu al hijjah", "zul hijjah"],
        correct: "Dhul-Hijjah",
        explanation: "The Day of Arafah is on the 9th of Dhul-Hijjah."
    },

    {
        category: "ISLAMIC HISTORY",
        question: "On which day of Dhul-Hijjah is Eid al-Adha?",
        answers: ["10", "ten", "10th", "tenth"],
        correct: "10th",
        explanation: "Eid al-Adha begins on the 10th of Dhul-Hijjah."
    },

    {
        category: "ISLAMIC HISTORY",
        question: "On which day of Shawwal is Eid al-Fitr?",
        answers: ["1", "one", "1st", "first"],
        correct: "1st",
        explanation: "Eid al-Fitr is on the first day of Shawwal."
    },

    {
        category: "GENERAL KNOWLEDGE",
        question: "What is the Islamic greeting commonly used between Muslims?",
        answers: ["assalamu alaikum", "as salamu alaykum", "salam alaikum"],
        correct: "As-salamu alaykum",
        explanation: "As-salamu alaykum means 'Peace be upon you.'"
    },

    {
        category: "GENERAL KNOWLEDGE",
        question: "What should a Muslim say after mentioning a future intention?",
        answers: ["inshaallah", "in sha allah", "in shaa allah"],
        correct: "Insha'Allah",
        explanation: "Insha'Allah means 'if Allah wills.'"
    },

    {
        category: "GENERAL KNOWLEDGE",
        question: "What does Alhamdulillah mean?",
        answers: ["praise be to allah", "all praise is for allah", "praise belongs to allah"],
        correct: "All praise is for Allah",
        explanation: "Alhamdulillah expresses praise and gratitude to Allah."
    },

    {
        category: "GENERAL KNOWLEDGE",
        question: "What does SubhanAllah express?",
        answers: ["glory be to allah", "glory to allah", "allah is perfect"],
        correct: "Glory be to Allah",
        explanation: "SubhanAllah expresses glorification of Allah and His perfection."
    },

    {
        category: "GENERAL KNOWLEDGE",
        question: "What does Allahu Akbar mean?",
        answers: ["allah is the greatest", "god is the greatest"],
        correct: "Allah is the Greatest",
        explanation: "Allahu Akbar means 'Allah is the Greatest.'"
    },

    {
        category: "GENERAL KNOWLEDGE",
        question: "What does Astaghfirullah mean?",
        answers: ["i seek forgiveness from allah", "i seek allahs forgiveness", "seek forgiveness from allah"],
        correct: "I seek forgiveness from Allah",
        explanation: "Astaghfirullah is a statement seeking Allah's forgiveness."
    }
  ];

/* =========================================================
   QUIZ STATE
========================================================= */

let currentQuestion = 0;
let score = 0;
let answered = false;


/* =========================================================
   ELEMENTS
========================================================= */

const intro = document.getElementById("quizIntro");
const quiz = document.getElementById("quizContainer");
const result = document.getElementById("quizResult");

const startButton = document.getElementById("startQuiz");
const submitButton = document.getElementById("submitAnswer");
const nextButton = document.getElementById("nextQuestion");

const answerInput = document.getElementById("answerInput");

const questionText = document.getElementById("questionText");
const questionCategory = document.getElementById("questionCategory");

const questionNumber = document.getElementById("questionNumber");
const questionTotal = document.getElementById("questionTotal");

const progressBar = document.getElementById("quizProgressBar");

const answerResult = document.getElementById("answerResult");
const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const correctAnswer = document.getElementById("correctAnswer");

const headerScore = document.getElementById("headerScore");

const finalScore = document.getElementById("finalScore");
const finalPercentage = document.getElementById("finalPercentage");
const finalMessage = document.getElementById("finalMessage");

const restartButton = document.getElementById("restartQuiz");
const backHome = document.getElementById("backHome");
const backButton = document.getElementById("backButton");

const toast = document.getElementById("quizToast");


/* =========================================================
   NORMALIZE ANSWERS
========================================================= */

function normalizeAnswer(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[’']/g, "")
        .replace(/[-–—]/g, " ")
        .replace(/[.,!?]/g, "")
        .replace(/\s+/g, " ");
}


/* =========================================================
   START
========================================================= */

function startQuiz() {

    currentQuestion = 0;
    score = 0;
    answered = false;

    headerScore.textContent = "0";

    intro.classList.add("hidden");
    result.classList.add("hidden");
    quiz.classList.remove("hidden");

    loadQuestion();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   LOAD QUESTION
========================================================= */

function loadQuestion() {

    const question = questions[currentQuestion];

    answered = false;

    questionText.textContent = question.question;
    questionCategory.textContent = question.category;

    questionNumber.textContent =
        `Question ${currentQuestion + 1}`;

    questionTotal.textContent =
        `of ${questions.length}`;

    const percentage =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width =
        `${percentage}%`;

    answerInput.value = "";
    answerInput.disabled = false;

    submitButton.classList.remove("hidden");
    nextButton.classList.add("hidden");

    answerResult.classList.add("hidden");
    answerResult.classList.remove(
        "correct",
        "wrong"
    );

    answerInput.focus();
}


/* =========================================================
   SUBMIT ANSWER
========================================================= */

function checkAnswer() {

    if (answered) return;

    const typedAnswer =
        normalizeAnswer(answerInput.value);

    if (!typedAnswer) {

        showToast(
            "Please write an answer first."
        );

        answerInput.focus();

        return;
    }

    answered = true;

    const question =
        questions[currentQuestion];

    const correct =
        question.answers.some(answer =>
            normalizeAnswer(answer) === typedAnswer
        );

    if (correct) {

        score++;

        headerScore.textContent =
            score;

        answerResult.classList.remove(
            "hidden",
            "wrong"
        );

        answerResult.classList.add(
            "correct"
        );

        resultIcon.textContent = "✓";

        resultTitle.textContent =
            "Correct!";

        resultMessage.textContent =
            "Excellent! Your answer is correct.";

    } else {

        answerResult.classList.remove(
            "hidden",
            "correct"
        );

        answerResult.classList.add(
            "wrong"
        );

        resultIcon.textContent = "✕";

        resultTitle.textContent =
            "Wrong answer";

        resultMessage.textContent =
            question.explanation;
    }

    correctAnswer.textContent =
        question.correct;

    answerInput.disabled = true;

    submitButton.classList.add(
        "hidden"
    );

    nextButton.classList.remove(
        "hidden"
    );
}


/* =========================================================
   NEXT
========================================================= */

function nextQuestion() {

    if (!answered) return;

    currentQuestion++;

    if (
        currentQuestion >=
        questions.length
    ) {

        finishQuiz();

        return;
    }

    loadQuestion();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   FINISH
========================================================= */

function finishQuiz() {

    quiz.classList.add("hidden");

    result.classList.remove("hidden");

    const total =
        questions.length;

    const percentage =
        Math.round(
            (score / total) * 100
        );

    finalScore.textContent =
        `${score} / ${total}`;

    finalPercentage.textContent =
        `${percentage}%`;

    if (percentage === 100) {

        finalMessage.textContent =
            "Excellent! You answered every question correctly.";

    } else if (percentage >= 80) {

        finalMessage.textContent =
            "Excellent work! Keep learning and growing.";

    } else if (percentage >= 60) {

        finalMessage.textContent =
            "Well done! Continue learning and improving.";

    } else {

        finalMessage.textContent =
            "Keep learning. Every question is an opportunity to gain knowledge.";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   RESTART
========================================================= */

function restartQuiz() {
    startQuiz();
}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


/* =========================================================
   ENTER KEY
========================================================= */

answerInput.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        if (!answered) {
            checkAnswer();
        } else {
            nextQuestion();
        }
    }
);


/* =========================================================
   BUTTONS
========================================================= */

startButton.addEventListener(
    "click",
    startQuiz
);

submitButton.addEventListener(
    "click",
    checkAnswer
);

nextButton.addEventListener(
    "click",
    nextQuestion
);

restartButton.addEventListener(
    "click",
    restartQuiz
);

backHome.addEventListener("click", () => {
    window.location.href = "./Index.html";
});

backButton.addEventListener("click", () => {
    window.location.href = "./Index.html";
});
    {
        
                
    
    }           