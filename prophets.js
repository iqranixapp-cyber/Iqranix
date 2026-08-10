"use strict";

/*
=========================================================
IQRANIX — PROPHETS & MESSENGERS
prophets.js

Matches:
    prophets.html
    prophets.css

Features:
    • 25 Prophets mentioned by name in the Qur'an
    • Detailed story structure
    • Search
    • Filters
    • Bookmarks using localStorage
    • Story reader
    • Previous / Next navigation
    • Qur'an references
    • Lessons
    • Text-size controls
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const backButton =
        document.getElementById("backButton");

    const bookmarkButton =
        document.getElementById("bookmarkButton");

    const prophetSearch =
        document.getElementById("prophetSearch");

    const clearSearch =
        document.getElementById("clearSearch");

    const filterButtons =
        document.querySelectorAll(".filter-button");

    const prophetList =
        document.getElementById("prophetList");

    const prophetCount =
        document.getElementById("prophetCount");

    const noResults =
        document.getElementById("noResults");

    const resetSearch =
        document.getElementById("resetSearch");

    const storyReader =
        document.getElementById("storyReader");

    const closeStory =
        document.getElementById("closeStory");

    const storyArabicName =
        document.getElementById("storyArabicName");

    const storyTitle =
        document.getElementById("storyTitle");

    const storySubtitle =
        document.getElementById("storySubtitle");

    const storyBookmark =
        document.getElementById("storyBookmark");

    const storyIcon =
        document.getElementById("storyIcon");

    const storyHeroName =
        document.getElementById("storyHeroName");

    const storyHeroDescription =
        document.getElementById("storyHeroDescription");

    const previousProphet =
        document.getElementById("previousProphet");

    const nextProphet =
        document.getElementById("nextProphet");

    const storyProgress =
        document.getElementById("storyProgress");

    const storyIntroduction =
        document.getElementById("storyIntroduction");

    const earlyLifeSection =
        document.getElementById("earlyLifeSection");

    const storyEarlyLife =
        document.getElementById("storyEarlyLife");

    const storyCall =
        document.getElementById("storyCall");

    const storyEvents =
        document.getElementById("storyEvents");

    const storyTrials =
        document.getElementById("storyTrials");

    const storyMiracles =
        document.getElementById("storyMiracles");

    const storyEnding =
        document.getElementById("storyEnding");

    const storyLessons =
        document.getElementById("storyLessons");

    const quranReferences =
        document.getElementById("quranReferences");

    const authenticityText =
        document.getElementById("authenticityText");

    const bottomPrevious =
        document.getElementById("bottomPrevious");

    const bottomNext =
        document.getElementById("bottomNext");

    const bookmarksPanel =
        document.getElementById("bookmarksPanel");

    const closeBookmarks =
        document.getElementById("closeBookmarks");

    const bookmarksList =
        document.getElementById("bookmarksList");

    const emptyBookmarks =
        document.getElementById("emptyBookmarks");

    const decreaseText =
        document.getElementById("decreaseText");

    const increaseText =
        document.getElementById("increaseText");

    const toast =
        document.getElementById("toast");


    /* =====================================================
       STORAGE
    ===================================================== */

    const BOOKMARK_STORAGE =
        "iqranix_prophet_bookmarks";

    const TEXT_SIZE_STORAGE =
        "iqranix_prophet_text_size";


    /* =====================================================
       PROPHET DATA
    ===================================================== */

    const PROPHETS = [

        {
            id: "adam",
            number: 1,
            name: "Adam",
            arabic: "آدم",
            title: "The First Human and Prophet",
            icon: "🌱",
            categories: ["quran"],

            description:
                "The first human being and the first prophet, created by Allah and taught knowledge.",

            introduction: `
                <p>
                    Prophet Adam (peace be upon him) was the first human being
                    created by Allah and the first prophet sent to humanity.
                    Allah created him with His power and honored him with
                    knowledge and a special position among creation.
                </p>

                <p>
                    The Qur'an describes Adam's creation, Allah's teaching of
                    the names, the command given to the angels to prostrate
                    before him, the temptation of Shaytan, and Adam's repentance.
                    His story establishes important foundations about human
                    dignity, responsibility, temptation, repentance and the
                    mercy of Allah.
                </p>
            `,

            earlyLife: `
                <p>
                    Allah informed the angels that He was going to place a
                    representative on earth. Adam was created from clay, and
                    Allah taught him knowledge that the angels did not possess.
                </p>

                <p>
                    Allah honored Adam and commanded the angels to prostrate
                    before him as an act of obedience to Allah. They obeyed,
                    but Iblis refused because of pride and arrogance.
                </p>
            `,

            call: `
                <p>
                    Adam's guidance began with his direct relationship with
                    Allah. He and his descendants were taught that Allah alone
                    is worthy of worship and that humanity must follow divine
                    guidance rather than the whispers of Shaytan.
                </p>
            `,

            events: `
                <p>
                    Adam and his wife were allowed to live in Paradise and eat
                    freely from its provisions, except for one forbidden tree.
                    Shaytan whispered to them and caused them to slip.
                </p>

                <p>
                    After they recognized their mistake, they turned back to
                    Allah in repentance. Allah accepted their repentance and
                    sent them to earth, where humanity's earthly life began.
                </p>
            `,

            trials: `
                <p>
                    Adam's great trial was the temptation of Shaytan and the
                    consequence of disobedience. His response teaches that
                    making a mistake is not the end of a person's relationship
                    with Allah.
                </p>

                <p>
                    Adam acknowledged his error and sought Allah's forgiveness
                    rather than becoming arrogant or continuing in wrongdoing.
                </p>
            `,

            miracles: `
                <p>
                    Among the signs connected with Adam's creation was Allah's
                    creation of him from clay and His teaching him knowledge.
                    Allah demonstrated Adam's special honor and knowledge before
                    the angels.
                </p>
            `,

            ending: `
                <p>
                    Adam became the first prophet and father of humanity.
                    His story remains a reminder that Allah's guidance is
                    available to humanity and that sincere repentance leads
                    back to Allah's mercy.
                </p>
            `,

            lessons: [
                "Human beings should remain humble before Allah.",
                "Knowledge is a great blessing and responsibility.",
                "Shaytan seeks to mislead humanity.",
                "A sincere mistake should be followed by sincere repentance.",
                "Allah's mercy is greater than our mistakes."
            ],

            references: [
                "Al-Baqarah 2:30–39",
                "Al-A'raf 7:11–27",
                "Ta-Ha 20:115–123",
                "Sad 38:71–85"
            ],

            authenticity:
                "The Qur'an provides the principal account of Adam's creation, the command to the angels, the temptation and repentance. Extra details found in popular stories should not automatically be treated as established facts."
        },


        {
            id: "idris",
            number: 2,
            name: "Idris",
            arabic: "إدريس",
            title: "A Truthful and Patient Prophet",
            icon: "📜",
            categories: ["quran"],

            description:
                "A prophet whom Allah described as truthful and raised to a high station.",

            introduction: `
                <p>
                    Prophet Idris (peace be upon him) is mentioned by name in
                    the Qur'an. Allah describes him as a truthful prophet and
                    praises his patience and righteousness.
                </p>

                <p>
                    Although the Qur'an gives only a short account of Idris,
                    the description itself carries an important lesson: a
                    prophet's greatness is not measured by how many historical
                    details are narrated, but by faithfulness to Allah.
                </p>
            `,

            earlyLife: `
                <p>
                    The Qur'an does not provide a detailed biography of Idris's
                    childhood or family life. Therefore, IQRANIX does not
                    present uncertain historical reports as established facts.
                </p>
            `,

            call: `
                <p>
                    Idris was a prophet who called people toward truth and
                    righteousness. His Qur'anic description emphasizes his
                    truthfulness.
                </p>
            `,

            events: `
                <p>
                    Allah says that Idris was raised to a high station. The
                    Qur'an does not give a long sequence of events from his
                    life, so additional claims should be treated carefully.
                </p>
            `,

            trials: `
                <p>
                    The Qur'an places Idris among those who demonstrated
                    patience. His example teaches believers to remain firm
                    upon truth even when circumstances are difficult.
                </p>
            `,

            miracles: `
                <p>
                    The Qur'an does not provide a detailed list of miracles
                    attributed to Idris. We therefore avoid assigning specific
                    miracles to him without reliable evidence.
                </p>
            `,

            ending: `
                <p>
                    Idris remains honored in the Qur'an as a truthful prophet.
                    His story reminds us that sincerity, patience and
                    righteousness are among the qualities beloved by Allah.
                </p>
            `,

            lessons: [
                "Truthfulness is a central quality of righteousness.",
                "Patience is essential when following Allah's guidance.",
                "Not every prophet's biography is narrated in detail.",
                "We should distinguish authentic revelation from uncertain stories."
            ],

            references: [
                "Maryam 19:56–57",
                "Al-Anbiya 21:85–86"
            ],

            authenticity:
                "The Qur'an gives limited information about Idris. This section deliberately avoids popular reports that cannot be firmly established from reliable Islamic sources."
        },


        {
            id: "nuh",
            number: 3,
            name: "Nuh",
            arabic: "نوح",
            title: "The Prophet of the Ark",
            icon: "🌊",
            categories: ["quran", "ulul-azm"],

            description:
                "A steadfast messenger who called his people to worship Allah for many years.",

            introduction: `
                <p>
                    Prophet Nuh (peace be upon him) was one of the great
                    messengers of Allah. His people had fallen into associating
                    partners with Allah, and Nuh called them back to sincere
                    worship of their Creator.
                </p>

                <p>
                    His story is one of extraordinary perseverance. He called
                    his people openly and privately, by night and by day, but
                    many rejected his message.
                </p>
            `,

            earlyLife: `
                <p>
                    The Qur'an does not provide a complete account of Nuh's
                    childhood. What it emphasizes is his prophetic mission and
                    his extraordinary patience with his people.
                </p>
            `,

            call: `
                <p>
                    Nuh called his people to worship Allah alone, seek His
                    forgiveness and abandon their false gods.
                </p>

                <p>
                    He warned them of punishment and reminded them that
                    returning to Allah brings forgiveness and blessing.
                </p>
            `,

            events: `
                <p>
                    When rejection continued, Allah instructed Nuh to build
                    the Ark under His guidance. His people mocked him while he
                    constructed it.
                </p>

                <p>
                    Then the decree of Allah came. The flood overwhelmed the
                    rejecting people, while Nuh and those who believed were
                    saved in the Ark.
                </p>
            `,

            trials: `
                <p>
                    Nuh endured rejection and mockery for a remarkably long
                    period. The Qur'an states that he remained among his people
                    for nine hundred and fifty years.
                </p>

                <p>
                    Even the rejection of one of his sons was a painful trial.
                    Nuh's story shows that a prophet can sincerely love people
                    while recognizing that guidance ultimately belongs to Allah.
                </p>
            `,

            miracles: `
                <p>
                    The Ark itself was built under Allah's revelation and became
                    the means through which the believers were saved from the
                    flood.
                </p>
            `,

            ending: `
                <p>
                    Nuh and the believers were saved, while the rejecting
                    people were destroyed by the flood. Allah preserved Nuh's
                    example as a lesson in patience, warning and reliance upon
                    Him.
                </p>
            `,

            lessons: [
                "Never give up when calling toward truth.",
                "Guidance belongs ultimately to Allah.",
                "Mockery should not prevent a believer from doing what is right.",
                "Family relationships cannot replace faith.",
                "Allah's promise to His messengers is true."
            ],

            references: [
                "Hud 11:25–49",
                "Al-Mu'minun 23:23–30",
                "Ash-Shu'ara 26:105–122",
                "Al-Qamar 54:9–17",
                "Nuh 71:1–28"
            ],

            authenticity:
                "The Qur'an provides the primary account of Nuh and the flood. The Qur'an explicitly states that Nuh remained among his people for 950 years."
        },


        {
            id: "hud",
            number: 4,
            name: "Hud",
            arabic: "هود",
            title: "The Messenger Sent to 'Ad",
            icon: "🏜️",
            categories: ["quran"],

            description:
                "A messenger who called the powerful people of 'Ad to worship Allah alone.",

            introduction: `
                <p>
                    Prophet Hud (peace be upon him) was sent to the people of
                    'Ad. They were known for their strength and worldly power,
                    but their strength did not protect them when they rejected
                    Allah's guidance.
                </p>
            `,

            earlyLife: `
                <p>
                    The Qur'an does not provide a detailed account of Hud's
                    childhood. It focuses instead on his mission to 'Ad.
                </p>
            `,

            call: `
                <p>
                    Hud called his people to worship Allah alone, seek His
                    forgiveness and abandon their arrogance.
                </p>
            `,

            events: `
                <p>
                    The people of 'Ad rejected Hud and challenged his warning.
                    They relied upon their strength and power.
                </p>

                <p>
                    Allah eventually sent a destructive wind against those who
                    rejected the truth, while Hud and the believers were saved.
                </p>
            `,

            trials: `
                <p>
                    Hud faced the arrogance of a powerful nation. His response
                    was confidence in Allah rather than fear of their strength.
                </p>
            `,

            miracles: `
                <p>
                    The punishment that overtook 'Ad demonstrated the power of
                    Allah over a people who considered themselves powerful.
                </p>
            `,

            ending: `
                <p>
                    Hud and the believers were saved. The destruction of 'Ad
                    became a warning for later generations not to allow worldly
                    strength to produce arrogance.
                </p>
            `,

            lessons: [
                "Worldly strength does not make a person independent of Allah.",
                "Arrogance can destroy a society.",
                "Prophets rely upon Allah even when facing powerful opposition.",
                "Seeking forgiveness is a means of Allah's mercy."
            ],

            references: [
                "Al-A'raf 7:65–72",
                "Hud 11:50–60",
                "Ash-Shu'ara 26:123–140",
                "Al-Ahqaf 46:21–26"
            ],

            authenticity:
                "This account follows the Qur'anic description of Hud and the people of 'Ad."
        },


        {
            id: "salih",
            number: 5,
            name: "Salih",
            arabic: "صالح",
            title: "The Prophet Sent to Thamud",
            icon: "🐪",
            categories: ["quran"],

            description:
                "A messenger whose people were given a clear sign through the she-camel.",

            introduction: `
                <p>
                    Prophet Salih (peace be upon him) was sent to the people of
                    Thamud. They lived among impressive dwellings carved into
                    mountains and possessed significant worldly ability.
                </p>

                <p>
                    Salih called them to worship Allah alone and warned them
                    against corruption and arrogance.
                </p>
            `,

            earlyLife: `
                <p>
                    Before his mission, Salih was known among his people. The
                    Qur'an records their words indicating that they had placed
                    hope in him before he called them to change their beliefs.
                </p>
            `,

            call: `
                <p>
                    Salih called Thamud to worship Allah and reminded them of
                    His blessings. He urged them to avoid corruption and
                    transgression.
                </p>
            `,

            events: `
                <p>
                    Allah gave Thamud a clear sign: the she-camel. Salih warned
                    them not to harm her and instructed them to allow her to
                    drink according to the arrangement given to them.
                </p>

                <p>
                    A group of them violated the command and killed the she-
                    camel. Salih warned them that punishment would follow.
                </p>
            `,

            trials: `
                <p>
                    Salih faced a people who demanded signs yet rejected the
                    truth after the sign was presented to them.
                </p>
            `,

            miracles: `
                <p>
                    The she-camel was a clear sign from Allah given to Thamud.
                    Its story became a test of whether they would obey Allah.
                </p>
            `,

            ending: `
                <p>
                    The people who persisted in rejection were struck by Allah's
                    punishment, while Salih and the believers were saved.
                </p>
            `,

            lessons: [
                "Signs from Allah should lead to obedience, not arrogance.",
                "Power and impressive achievements cannot save a rejecting people.",
                "Allah's commands must be respected.",
                "Prophets warn their people out of sincere concern."
            ],

            references: [
                "Al-A'raf 7:73–79",
                "Hud 11:61–68",
                "Ash-Shu'ara 26:141–159",
                "Ash-Shams 91:11–15"
            ],

            authenticity:
                "The Qur'an is the primary source for the account of Salih and the she-camel."
        },


        {
            id: "ibrahim",
            number: 6,
            name: "Ibrahim",
            arabic: "إبراهيم",
            title: "The Friend of Allah",
            icon: "🔥",
            categories: ["quran", "ulul-azm"],

            description:
                "A great messenger who stood firmly for pure monotheism and obedience to Allah.",

            introduction: `
                <p>
                    Prophet Ibrahim (peace be upon him) is one of the greatest
                    prophets mentioned throughout the Qur'an. His life is a
                    powerful example of pure monotheism, courage, sacrifice and
                    complete submission to Allah.
                </p>

                <p>
                    Ibrahim challenged the worship of created things and called
                    his people to worship the One who created the heavens and
                    earth.
                </p>
            `,

            earlyLife: `
                <p>
                    Ibrahim questioned the false worship practiced by his
                    people. The Qur'an describes his reasoning against the
                    worship of celestial bodies and his rejection of idols.
                </p>
            `,

            call: `
                <p>
                    Ibrahim called his people to worship Allah alone. He
                    challenged the logic of idol worship and demonstrated that
                    created things cannot deserve worship.
                </p>
            `,

            events: `
                <p>
                    Ibrahim confronted his people about their idols. He broke
                    the idols, leaving the largest one, and challenged them to
                    reflect on whether their idols could actually speak or help
                    them.
                </p>

                <p>
                    His people decided to punish him by throwing him into a
                    fire, but Allah commanded the fire to become cool and safe
                    for Ibrahim.
                </p>

                <p>
                    Later in his life, Ibrahim and Isma'il raised the foundations
                    of the Ka'bah and prayed that Allah would accept their work.
                </p>
            `,

            trials: `
                <p>
                    Ibrahim faced rejection from his people and separation from
                    his homeland. He was tested with family responsibilities,
                    migration and sacrifice.
                </p>

                <p>
                    His willingness to obey Allah even when the command involved
                    an extremely difficult sacrifice became one of the most
                    powerful examples of submission in Islamic tradition.
                </p>
            `,

            miracles: `
                <p>
                    One of the clearest miracles in Ibrahim's story is Allah's
                    command to the fire to become cool and safe for him.
                </p>

                <p>
                    The Qur'an also records Allah showing Ibrahim how He gives
                    life to the dead as a strengthening of his heart.
                </p>
            `,

            ending: `
                <p>
                    Ibrahim became an example of sincere submission to Allah.
                    His legacy continued through his descendants, including
                    several prophets, and his connection with the Ka'bah remains
                    central to Muslim worship.
                </p>
            `,

            lessons: [
                "Worship belongs to Allah alone.",
                "Faith sometimes requires courage in the face of opposition.",
                "True submission means trusting Allah even during difficult tests.",
                "Parents and families should be treated with respect while remaining faithful to Allah.",
                "Allah can protect His servants in ways they cannot predict."
            ],

            references: [
                "Al-Baqarah 2:124–141",
                "Al-An'am 6:74–83",
                "Maryam 19:41–50",
                "Al-Anbiya 21:51–73",
                "Ash-Shu'ara 26:69–104",
                "As-Saffat 37:83–113",
                "Al-Mumtahanah 60:4–6"
            ],

            authenticity:
                "This story is based primarily on the Qur'an. Some popular details about Ibrahim's life go beyond what the Qur'an explicitly states and should therefore be treated cautiously."
        },


        {
            id: "lut",
            number: 7,
            name: "Lut",
            arabic: "لوط",
            title: "The Messenger to His People",
            icon: "🏘️",
            categories: ["quran"],

            description:
                "A prophet who warned his people against grave immorality and rejection of Allah's commands.",

            introduction: `
                <p>
                    Prophet Lut (peace be upon him) was a messenger who warned
                    his people against serious wrongdoing and called them back
                    to obedience to Allah.
                </p>
            `,

            earlyLife: `
                <p>
                    The Qur'an connects Lut with Ibrahim and describes him as
                    one of the believers who followed Allah's guidance.
                </p>
            `,

            call: `
                <p>
                    Lut called his people away from immoral behavior and
                    reminded them to fear Allah.
                </p>
            `,

            events: `
                <p>
                    The people continued in their wrongdoing despite Lut's
                    warning. Angels came to Lut in human form, and the people
                    attempted to harm his guests.
                </p>

                <p>
                    Lut was instructed to leave with his believing family during
                    the night.
                </p>
            `,

            trials: `
                <p>
                    Lut faced intense rejection from his community. His story
                    demonstrates the difficulty a prophet may experience when
                    calling a society away from deeply established wrongdoing.
                </p>
            `,

            miracles: `
                <p>
                    The arrival of the angels and the eventual destruction of
                    the rejecting towns were among the extraordinary events
                    associated with Lut's mission.
                </p>
            `,

            ending: `
                <p>
                    Lut and the believers were saved, while the towns were
                    destroyed because of persistent rejection and wrongdoing.
                </p>
            `,

            lessons: [
                "Moral corruption should not be normalized simply because it is widespread.",
                "A believer should remain firm when society rejects truth.",
                "Allah knows the condition of every community.",
                "Obedience to Allah takes priority over social pressure."
            ],

            references: [
                "Hud 11:77–83",
                "Al-Hijr 15:57–77",
                "Ash-Shu'ara 26:160–175",
                "An-Naml 27:54–58",
                "Al-Ankabut 29:28–35"
            ],

            authenticity:
                "The account follows the Qur'anic narrative. IQRANIX avoids adding speculative details about the people or locations beyond what reliable sources establish."
        },


        {
            id: "ismail",
            number: 8,
            name: "Isma'il",
            arabic: "إسماعيل",
            title: "The Patient and Truthful Prophet",
            icon: "🕋",
            categories: ["quran"],

            description:
                "A prophet praised for truthfulness, patience and obedience.",

            introduction: `
                <p>
                    Prophet Isma'il (peace be upon him) was the son of Ibrahim.
                    The Qur'an praises him for keeping his promises and for
                    commanding his family to prayer and charity.
                </p>
            `,

            earlyLife: `
                <p>
                    The Qur'an connects Isma'il with the household of Ibrahim
                    and with the establishment of worship around the Sacred
                    House.
                </p>
            `,

            call: `
                <p>
                    Isma'il was committed to worshipping Allah and encouraged
                    his family toward prayer and obedience.
                </p>
            `,

            events: `
                <p>
                    Ibrahim and Isma'il raised the foundations of the Ka'bah and
                    prayed that Allah would accept their work and guide their
                    descendants.
                </p>

                <p>
                    The Qur'an also describes Isma'il's willingness to submit
                    when Ibrahim informed him about the difficult test of
                    sacrifice.
                </p>
            `,

            trials: `
                <p>
                    Isma'il demonstrated patience and submission during one of
                    the most difficult tests described in the Qur'an.
                </p>
            `,

            miracles: `
                <p>
                    The Qur'an emphasizes Allah's intervention in the sacrifice
                    test, providing a replacement sacrifice after Ibrahim and
                    Isma'il demonstrated submission.
                </p>
            `,

            ending: `
                <p>
                    Isma'il remained a righteous prophet and became an important
                    figure in the history of the Sacred House and the lineage
                    connected with Prophet Muhammad ﷺ.
                </p>
            `,

            lessons: [
                "Keep your promises.",
                "Patience and obedience are signs of strong faith.",
                "Prayer should be established within the family.",
                "Allah rewards sincere submission."
            ],

            references: [
                "Al-Baqarah 2:125–129",
                "Maryam 19:54–55",
                "As-Saffat 37:100–113"
            ],

            authenticity:
                "The Qur'an is the primary source for the account of Isma'il."
        },


        {
            id: "ishaq",
            number: 9,
            name: "Ishaq",
            arabic: "إسحاق",
            title: "The Son Given as Good News",
            icon: "🌿",
            categories: ["quran"],

            description:
                "A righteous prophet whose birth was announced as good news to Ibrahim.",

            introduction: `
                <p>
                    Prophet Ishaq (peace be upon him) was a son of Ibrahim and
                    was granted to him as good news from Allah.
                </p>
            `,

            earlyLife: `
                <p>
                    The Qur'an describes the announcement of Ishaq's birth to
                    Ibrahim and his family.
                </p>
            `,

            call: `
                <p>
                    Ishaq was among the prophets who guided people toward
                    worship and obedience to Allah.
                </p>
            `,

            events: `
                <p>
                    Allah blessed Ishaq and placed prophethood and scripture
                    guidance within his descendants.
                </p>
            `,

            trials: `
                <p>
                    The Qur'an does not provide a long account of Ishaq's
                    personal trials, so uncertain stories are not presented as
                    established facts.
                </p>
            `,

            miracles: `
                <p>
                    The announcement of Ishaq's birth to Ibrahim and his wife,
                    despite their old age, was a sign of Allah's power.
                </p>
            `,

            ending: `
                <p>
                    Ishaq was honored as a prophet and righteous servant of
                    Allah.
                </p>
            `,

            lessons: [
                "Allah's power is not limited by human expectations.",
                "Good news can arrive after long periods of waiting.",
                "Prophethood is a blessing from Allah.",
                "Righteousness should continue through generations."
            ],

            references: [
                "Al-Baqarah 2:133–136",
                "Hud 11:69–73",
                "Maryam 19:49–50",
                "As-Saffat 37:112–113"
            ],

            authenticity:
                "The Qur'an provides the basis for Ishaq's prophetic status and the announcement of his birth."
        },


        {
            id: "yaqub",
            number: 10,
            name: "Ya'qub",
            arabic: "يعقوب",
            title: "Israel",
            icon: "🌿",
            categories: ["quran"],

            description:
                "A righteous prophet and father of a family blessed with guidance.",

            introduction: `
                <p>
                    Prophet Ya'qub (peace be upon him), also known as Israel,
                    was the son of Ishaq and the father of Yusuf and his
                    brothers.
                </p>

                <p>
                    His life demonstrates patience, trust in Allah and concern
                    for the faith of his children.
                </p>
            `,

            earlyLife: `
                <p>
                    Ya'qub belonged to the blessed family descended from Ibrahim
                    and Ishaq.
                </p>
            `,

            call: `
                <p>
                    Ya'qub emphasized worship of Allah and instructed his
                    children to remain faithful to Him.
                </p>
            `,

            events: `
                <p>
                    A major part of Ya'qub's story appears through his
                    relationship with Yusuf and the painful separation that
                    followed Yusuf's disappearance.
                </p>
            `,

            trials: `
                <p>
                    Ya'qub experienced profound grief after Yusuf was separated
                    from the family. Yet he remained patient and relied upon
                    Allah.
                </p>

                <p>
                    The Qur'an describes his eyes becoming white from grief, yet
                    he continued to turn to Allah with hope.
                </p>
            `,

            miracles: `
                <p>
                    The eventual reunion of Ya'qub with Yusuf demonstrates the
                    fulfillment of Allah's promise and the reward of patience.
                </p>
            `,

            ending: `
                <p>
                    Ya'qub was reunited with Yusuf and witnessed Allah's plan
                    unfold after years of difficulty.
                </p>
            `,

            lessons: [
                "Beautiful patience does not mean having no sadness.",
                "A believer can grieve while still trusting Allah.",
                "Never lose hope in Allah's mercy.",
                "Parents should care about the faith of their children."
            ],

            references: [
                "Al-Baqarah 2:132–133",
                "Yusuf 12:4–101"
            ],

            authenticity:
                "The detailed account of Ya'qub's family life comes primarily from Surah Yusuf."
        },


        {
            id: "yusuf",
            number: 11,
            name: "Yusuf",
            arabic: "يوسف",
            title: "The Prophet of Patience and Forgiveness",
            icon: "🌟",
            categories: ["quran"],

            description:
                "A prophet whose life moved from betrayal and hardship to honor and forgiveness.",

            introduction: `
                <p>
                    Prophet Yusuf (peace be upon him) has one of the most
                    detailed continuous stories in the Qur'an. Surah Yusuf
                    presents his journey from childhood through betrayal,
                    slavery, imprisonment, leadership and eventual reunion with
                    his family.
                </p>

                <p>
                    His story is filled with lessons about patience, purity,
                    forgiveness, wisdom and trusting Allah's plan.
                </p>
            `,

            earlyLife: `
                <p>
                    Yusuf told his father Ya'qub about a dream in which he saw
                    eleven stars, the sun and the moon prostrating to him.
                    Ya'qub recognized that the dream was significant and warned
                    him not to tell his brothers.
                </p>

                <p>
                    Yusuf's brothers became jealous of the special relationship
                    between him and their father.
                </p>
            `,

            call: `
                <p>
                    Yusuf remained a servant of Allah throughout every stage of
                    his life. Even while imprisoned, he called his companions
                    toward worshipping Allah alone.
                </p>
            `,

            events: `
                <p>
                    Yusuf's brothers took him away and left him in a well.
                    Travelers later found him and sold him.
                </p>

                <p>
                    Yusuf was eventually placed in prison after refusing an
                    immoral temptation. While imprisoned, Allah granted him
                    knowledge to interpret dreams.
                </p>

                <p>
                    His interpretation of the ruler's dream eventually led to
                    his release and appointment to an important position in
                    Egypt.
                </p>

                <p>
                    Years later, Yusuf's brothers came to Egypt seeking food.
                    Yusuf eventually revealed his identity and reunited with
                    his family.
                </p>
            `,

            trials: `
                <p>
                    Yusuf experienced betrayal by his brothers, separation from
                    his father, enslavement, temptation, false accusation and
                    imprisonment.
                </p>

                <p>
                    Despite all of these trials, he remained patient and
                    protected his faith.
                </p>
            `,

            miracles: `
                <p>
                    Allah granted Yusuf knowledge of dream interpretation. The
                    dreams and their fulfillment became part of the unfolding
                    of Allah's plan for his life.
                </p>
            `,

            ending: `
                <p>
                    Yusuf forgave his brothers instead of taking revenge. His
                    family was reunited, and the dream from his childhood was
                    fulfilled.
                </p>

                <p>
                    His story demonstrates that hardship can be part of a plan
                    whose wisdom becomes clear only much later.
                </p>
            `,

            lessons: [
                "Patience during hardship can lead to unexpected blessings.",
                "Protect yourself from temptation even when nobody is watching.",
                "Forgiveness can be stronger than revenge.",
                "Allah's plan can unfold through circumstances that initially appear painful.",
                "Never lose hope in Allah."
            ],

            references: [
                "Yusuf 12:1–111"
            ],

            authenticity:
                "The story of Yusuf is presented in exceptional detail in Surah Yusuf. IQRANIX follows the Qur'anic account and avoids treating later storytelling additions as certain."
        },


        {
            id: "shuaib",
            number: 12,
            name: "Shu'ayb",
            arabic: "شعيب",
            title: "The Messenger Who Warned Against Dishonesty",
            icon: "⚖️",
            categories: ["quran"],

            description:
                "A prophet who called his people to worship Allah and deal honestly with others.",

            introduction: `
                <p>
                    Prophet Shu'ayb (peace be upon him) was sent to the people
                    of Madyan. Their wrongdoing included dishonest dealings and
                    corruption.
                </p>
            `,

            earlyLife: `
                <p>
                    The Qur'an focuses on Shu'ayb's mission rather than giving a
                    detailed childhood biography.
                </p>
            `,

            call: `
                <p>
                    Shu'ayb called his people to worship Allah alone and to give
                    full measure and weight.
                </p>
            `,

            events: `
                <p>
                    His people rejected him and threatened him. Shu'ayb
                    continued warning them against corruption and dishonesty.
                </p>
            `,

            trials: `
                <p>
                    Shu'ayb faced strong resistance from people who were
                    unwilling to change their economic and social practices.
                </p>
            `,

            miracles: `
                <p>
                    The Qur'an emphasizes the punishment that came upon those
                    who persisted in rejection rather than providing an
                    extensive list of personal miracles for Shu'ayb.
                </p>
            `,

            ending: `
                <p>
                    Shu'ayb and the believers were saved, while those who
                    persisted in rejection were punished.
                </p>
            `,

            lessons: [
                "Honesty in business is part of faith.",
                "Economic corruption is a serious moral issue.",
                "Worship of Allah must affect how we treat other people.",
                "Justice and truthful dealings are essential."
            ],

            references: [
                "Al-A'raf 7:85–93",
                "Hud 11:84–95",
                "Ash-Shu'ara 26:176–191",
                "Al-Ankabut 29:36–37"
            ],

            authenticity:
                "The account follows the Qur'anic descriptions of Shu'ayb and Madyan."
        },


        {
            id: "ayyub",
            number: 13,
            name: "Ayyub",
            arabic: "أيوب",
            title: "The Prophet of Extraordinary Patience",
            icon: "🤲",
            categories: ["quran"],

            description:
                "A prophet remembered for patience during severe trials.",

            introduction: `
                <p>
                    Prophet Ayyub (peace be upon him) is one of the Qur'an's
                    clearest examples of patience during hardship.
                </p>

                <p>
                    Allah describes him as a servant who was patient and
                    excellent in his devotion.
                </p>
            `,

            earlyLife: `
                <p>
                    The Qur'an does not provide a complete biography of Ayyub's
                    early years. Therefore, IQRANIX does not present popular
                    legends as established history.
                </p>
            `,

            call: `
                <p>
                    Ayyub remained devoted to Allah during his trials and turned
                    to Him in supplication.
                </p>
            `,

            events: `
                <p>
                    Ayyub called upon Allah during his affliction, saying that
                    harm had touched him while Allah is the Most Merciful of
                    those who show mercy.
                </p>

                <p>
                    Allah answered his supplication and restored what he had
                    lost.
                </p>
            `,

            trials: `
                <p>
                    Ayyub's trial became a lasting example of patience. His
                    suffering did not cause him to abandon trust in Allah.
                </p>
            `,

            miracles: `
                <p>
                    Allah instructed Ayyub to strike the ground, after which
                    water appeared for him to wash and drink, and Allah removed
                    his affliction.
                </p>
            `,

            ending: `
                <p>
                    Allah restored Ayyub's blessings and praised his patience.
                    His story remains an example for anyone experiencing
                    difficulty.
                </p>
            `,

            lessons: [
                "Patience does not mean abandoning supplication.",
                "Turn to Allah during hardship.",
                "Allah's mercy is always greater than our difficulties.",
                "Trials do not necessarily mean Allah has abandoned a person."
            ],

            references: [
                "Al-Anbiya 21:83–84",
                "Sad 38:41–44"
            ],

            authenticity:
                "The Qur'an gives the essential account of Ayyub. Many additional details commonly circulated about the exact nature and duration of his illness are not stated explicitly in the Qur'an."
        },


        {
            id: "dhul-kifl",
            number: 14,
            name: "Dhul-Kifl",
            arabic: "ذو الكفل",
            title: "Among the Patient and Righteous",
            icon: "🌿",
            categories: ["quran"],

            description:
                "A righteous figure whom Allah praised among the patient and good.",

            introduction: `
                <p>
                    Dhul-Kifl is mentioned in the Qur'an among the patient and
                    righteous. The Qur'an gives only limited details about him.
                </p>
            `,

            earlyLife: `
                <p>
                    The Qur'an does not provide a detailed biography of
                    Dhul-Kifl's early life.
                </p>
            `,

            call: `
                <p>
                    His mention alongside righteous servants emphasizes
                    devotion, patience and obedience to Allah.
                </p>
            `,

            events: `
                <p>
                    The Qur'an does not provide an extended narrative of
                    particular events from his life.
                </p>
            `,

            trials: `
                <p>
                    Dhul-Kifl is specifically mentioned among those who were
                    patient, highlighting steadfastness as a major quality.
                </p>
            `,

            miracles: `
                <p>
                    No detailed miracles are established in the Qur'an for
                    Dhul-Kifl, so none are presented as certain here.
                </p>
            `,

            ending: `
                <p>
                    Allah included Dhul-Kifl among His righteous servants.
                </p>
            `,

            lessons: [
                "Patience is a quality praised by Allah.",
                "We should not invent details where revelation is silent.",
                "Righteousness can be achieved through steadfast obedience."
            ],

            references: [
                "Al-Anbiya 21:85–86",
                "Sad 38:48"
            ],

            authenticity:
                "The Qur'an gives limited information about Dhul-Kifl. IQRANIX avoids presenting disputed historical identifications as certain."
        },


        {
            id: "musa",
            number: 15,
            name: "Musa",
            arabic: "موسى",
            title: "The Messenger Who Faced Pharaoh",
            icon: "🌊",
            categories: ["quran", "ulul-azm"],

            description:
                "One of the most frequently mentioned prophets in the Qur'an, sent to Pharaoh and the Children of Israel.",

            introduction: `
                <p>
                    Prophet Musa (peace be upon him) is one of the most
                    frequently mentioned prophets in the Qur'an. His life
                    contains lessons about courage, leadership, patience,
                    revelation and reliance upon Allah.
                </p>

                <p>
                    Musa was sent to Pharaoh, who had oppressed the Children of
                    Israel, and he was also given responsibility for guiding his
                    people.
                </p>
            `,

            earlyLife: `
                <p>
                    When Pharaoh's oppression threatened newborn boys from the
                    Children of Israel, Allah inspired Musa's mother to place
                    him in a chest and set it upon the river when necessary.
                </p>

                <p>
                    The family of Pharaoh found Musa and took him in. Allah then
                    arranged for Musa to return to his mother so that her heart
                    would be comforted.
                </p>

                <p>
                    Later, Musa left Egypt after an incident and eventually
                    reached Madyan, where he lived for a period before returning
                    toward Egypt.
                </p>
            `,

            call: `
                <p>
                    Allah spoke to Musa and chose him as a messenger. He was
                    commanded to go to Pharaoh and call him toward the worship
                    of Allah.
                </p>

                <p>
                    Musa asked Allah to strengthen him through his brother
                    Harun, and Allah granted his request.
                </p>
            `,

            events: `
                <p>
                    Musa confronted Pharaoh and presented clear signs. Pharaoh
                    rejected the message and gathered magicians to oppose Musa.
                </p>

                <p>
                    The magicians recognized the truth of Musa's sign and
                    believed in Allah despite Pharaoh's threats.
                </p>

                <p>
                    Musa eventually led the Children of Israel out of Egypt.
                    Pharaoh pursued them, but Allah parted the sea and saved
                    Musa and the believers.
                </p>

                <p>
                    Musa later received the Tablets and guided the Children of
                    Israel through many difficult events.
                </p>
            `,

            trials: `
                <p>
                    Musa faced Pharaoh's tyranny, opposition from his own people,
                    difficult leadership responsibilities and repeated
                    disobedience from some among the Children of Israel.
                </p>

                <p>
                    His story demonstrates that leadership requires patience,
                    prayer and constant reliance upon Allah.
                </p>
            `,

            miracles: `
                <p>
                    Allah gave Musa several signs, including his staff and the
                    shining hand. The sea was parted by Allah's command, saving
                    Musa and the believers.
                </p>
            `,

            ending: `
                <p>
                    Musa remained one of Allah's greatest messengers. His story
                    continues through the Qur'an as a source of guidance about
                    courage, leadership, revelation and perseverance.
                </p>
            `,

            lessons: [
                "Stand against oppression with wisdom and courage.",
                "Ask Allah for help when facing difficult responsibilities.",
                "Good leadership requires patience.",
                "Never underestimate the power of sincere faith.",
                "Allah can create a way out when circumstances appear impossible."
            ],

            references: [
                "Ta-Ha 20:9–98",
                "Al-Qasas 28:3–46",
                "Ash-Shu'ara 26:10–68",
                "Yunus 10:75–92",
                "Al-A'raf 7:103–156"
            ],

            authenticity:
                "The Qur'an contains extensive accounts of Musa. This section follows those accounts and avoids combining them with unsupported later legends."
        },


        {
            id: "harun",
            number: 16,
            name: "Harun",
            arabic: "هارون",
            title: "The Brother and Supporter of Musa",
            icon: "🕌",
            categories: ["quran"],

            description:
                "A prophet appointed alongside Musa to help deliver Allah's message.",

            introduction: `
                <p>
                    Prophet Harun (peace be upon him) was the brother of Musa.
                    Musa asked Allah to appoint Harun as a helper because Harun
                    was eloquent in speech.
                </p>
            `,

            earlyLife: `
                <p>
                    Harun belonged to the Children of Israel and was chosen by
                    Allah as a prophet.
                </p>
            `,

            call: `
                <p>
                    Harun supported Musa in calling Pharaoh and the Children of
                    Israel toward obedience to Allah.
                </p>
            `,

            events: `
                <p>
                    Harun shared the mission with Musa. When Musa went to meet
                    Allah, Harun was left responsible for the people.
                </p>

                <p>
                    During Musa's absence, some people began worshipping the
                    calf. Harun tried to stop them but faced resistance.
                </p>
            `,

            trials: `
                <p>
                    Harun had to manage a community while Musa was away and
                    faced the difficult situation of people falling into
                    idolatry.
                </p>
            `,

            miracles: `
                <p>
                    The Qur'an does not give Harun a separate detailed list of
                    miracles. His honor comes from his prophethood and his role
                    beside Musa.
                </p>
            `,

            ending: `
                <p>
                    Harun remained a prophet and companion of Musa in guiding
                    the Children of Israel.
                </p>
            `,

            lessons: [
                "Good teamwork can strengthen a mission.",
                "Family members can support one another in righteousness.",
                "Leadership sometimes requires patience with difficult communities.",
                "A person should distinguish between what they can control and what they cannot."
            ],

            references: [
                "Al-Baqarah 2:248",
                "Al-A'raf 7:142–150",
                "Ta-Ha 20:29–94",
                "Al-Qasas 28:34"
            ],

            authenticity:
                "The account follows the Qur'anic descriptions of Harun and his role alongside Musa."
        },


        {
            id: "dawud",
            number: 17,
            name: "Dawud",
            arabic: "داود",
            title: "The Prophet and Just Leader",
            icon: "👑",
            categories: ["quran"],

            description:
                "A prophet and king whom Allah blessed with wisdom, judgment and the Zabur.",

            introduction: `
                <p>
                    Prophet Dawud (peace be upon him) was both a prophet and a
                    ruler. Allah granted him wisdom, judgment and the Zabur.
                </p>
            `,

            earlyLife: `
                <p>
                    Dawud became prominent during the conflict with Jalut and
                    was instrumental in defeating him by Allah's permission.
                </p>
            `,

            call: `
                <p>
                    Dawud ruled with justice and worshipped Allah with deep
                    devotion.
                </p>
            `,

            events: `
                <p>
                    Allah granted Dawud the Zabur and gave him strength in
                    judgment and leadership.
                </p>

                <p>
                    The mountains and birds were described as glorifying Allah
                    with him.
                </p>
            `,

            trials: `
                <p>
                    Dawud was tested with leadership and judgment. The Qur'an
                    recounts an incident involving two disputing parties and
                    teaches the importance of justice.
                </p>
            `,

            miracles: `
                <p>
                    Allah softened iron for Dawud and taught him the making of
                    protective armor. The mountains and birds glorified Allah
                    with him.
                </p>
            `,

            ending: `
                <p>
                    Dawud remained a righteous servant and just ruler, and his
                    example connects worship with responsible leadership.
                </p>
            `,

            lessons: [
                "Leadership is a responsibility before Allah.",
                "Justice must be maintained when judging disputes.",
                "Strength and authority should be used responsibly.",
                "Worship and leadership can exist together."
            ],

            references: [
                "Al-Baqarah 2:251",
                "Al-Anbiya 21:78–82",
                "Saba 34:10–11",
                "Sad 38:17–26"
            ],

            authenticity:
                "The account follows the Qur'anic descriptions of Dawud. Details from later storytelling traditions are not automatically treated as certain."
        },


        {
            id: "sulaiman",
            number: 18,
            name: "Sulaiman",
            arabic: "سليمان",
            title: "The Prophet-King Blessed with Extraordinary Gifts",
            icon: "👑",
            categories: ["quran"],

            description:
                "A prophet and king granted extraordinary authority, wisdom and blessings by Allah.",

            introduction: `
                <p>
                    Prophet Sulaiman (peace be upon him) was the son of Dawud.
                    Allah granted him extraordinary authority and wisdom.
                </p>
            `,

            earlyLife: `
                <p>
                    Sulaiman inherited Dawud's kingdom and was blessed with
                    understanding and judgment.
                </p>
            `,

            call: `
                <p>
                    Despite enormous authority, Sulaiman recognized that his
                    blessings came from Allah and repeatedly turned to Him in
                    gratitude.
                </p>
            `,

            events: `
                <p>
                    Allah subjected the wind and some of the jinn to Sulaiman's
                    command by His permission. Sulaiman also understood the
                    speech of birds.
                </p>

                <p>
                    A famous part of his story involves the hoopoe and the Queen
                    of Sheba. Sulaiman invited her people toward submission to
                    Allah.
                </p>
            `,

            trials: `
                <p>
                    Sulaiman's trial was not simply poverty or persecution. He
                    was tested through enormous authority and wealth.
                </p>

                <p>
                    His story teaches that having great blessings should produce
                    gratitude rather than arrogance.
                </p>
            `,

            miracles: `
                <p>
                    Allah subjected the wind and certain jinn to Sulaiman and
                    taught him understanding of the speech of birds.
                </p>
            `,

            ending: `
                <p>
                    Sulaiman remained a grateful servant of Allah and asked Him
                    for a kingdom that would be uniquely his. His story remains
                    a powerful lesson about using blessings responsibly.
                </p>
            `,

            lessons: [
                "Great blessings should increase gratitude.",
                "Power belongs ultimately to Allah.",
                "Wisdom is more valuable than authority alone.",
                "A leader should invite people toward truth rather than personal glory."
            ],

            references: [
                "An-Naml 27:15–44",
                "Saba 34:12–14",
                "Sad 38:30–40"
            ],

            authenticity:
                "The Qur'an is the primary source for Sulaiman's extraordinary abilities and his encounter with the Queen of Sheba."
        },


        {
            id: "ilyas",
            number: 19,
            name: "Ilyas",
            arabic: "إلياس",
            title: "The Messenger Who Called Against Idolatry",
            icon: "🌿",
            categories: ["quran"],

            description:
                "A prophet who called his people to worship Allah and abandon the worship of false gods.",

            introduction: `
                <p>
                    Prophet Ilyas (peace be upon him) called his people to fear
                    Allah and abandon the worship of false gods.
                </p>
            `,

            earlyLife: `
                <p>
                    The Qur'an gives limited biographical information about
                    Ilyas.
                </p>
            `,

            call: `
                <p>
                    Ilyas challenged the worship of Ba'l and called his people
                    back to Allah, their Lord and the Lord of their ancestors.
                </p>
            `,

            events: `
                <p>
                    His people rejected his call, but Allah praised Ilyas among
                    His righteous servants.
                </p>
            `,

            trials: `
                <p>
                    Ilyas faced the rejection of people who had become attached
                    to false worship.
                </p>
            `,

            miracles: `
                <p>
                    The Qur'an does not give an extended list of miracles for
                    Ilyas, so we do not add unsupported details.
                </p>
            `,

            ending: `
                <p>
                    Allah preserved the good mention of Ilyas and included him
                    among His righteous servants.
                </p>
            `,

            lessons: [
                "Pure worship is the central message of the prophets.",
                "Rejecting false worship requires courage.",
                "Allah honors sincere servants even when people reject them."
            ],

            references: [
                "Al-An'am 6:85",
                "As-Saffat 37:123–132"
            ],

            authenticity:
                "The Qur'an provides the principal account of Ilyas."
        },


        {
            id: "alyasa",
            number: 20,
            name: "Al-Yasa",
            arabic: "اليسع",
            title: "Among the Righteous",
            icon: "🌿",
            categories: ["quran"],

            description:
                "A prophet whom Allah honored among the righteous and chosen servants.",

            introduction: `
                <p>
                    Al-Yasa (peace be upon him) is mentioned by name in the
                    Qur'an among the prophets and righteous servants.
                </p>
            `,

            earlyLife: `
                <p>
                    The Qur'an does not provide a detailed account of his early
                    life.
                </p>
            `,

            call: `
                <p>
                    As a prophet, Al-Yasa called people toward obedience to
                    Allah.
                </p>
            `,

            events: `
                <p>
                    The Qur'an does not provide an extended narrative of his
                    mission.
                </p>
            `,

            trials: `
                <p>
                    His mention among the chosen and righteous teaches that
                    righteousness itself is a great achievement.
                </p>
            `,

            miracles: `
                <p>
                    The Qur'an does not provide a detailed list of miracles for
                    Al-Yasa.
                </p>
            `,

            ending: `
                <p>
                    Allah included Al-Yasa among the excellent and chosen
                    servants.
                </p>
            `,

            lessons: [
                "Righteousness is honored by Allah.",
                "We should not invent details where revelation is brief.",
                "Prophetic guidance centers on obedience to Allah."
            ],

            references: [
                "Al-An'am 6:86",
                "Sad 38:48"
            ],

            authenticity:
                "The Qur'an gives limited information about Al-Yasa, so uncertain historical narratives are not presented as facts."
        },


        {
            id: "yunus",
            number: 21,
            name: "Yunus",
            arabic: "يونس",
            title: "The Prophet of the Whale",
            icon: "🐋",
            categories: ["quran"],

            description:
                "A prophet whose story teaches repentance, supplication and Allah's mercy.",

            introduction: `
                <p>
                    Prophet Yunus (peace be upon him) was sent to his people and
                    experienced a profound trial when he left before receiving
                    the permission he needed.
                </p>
            `,

            earlyLife: `
                <p>
                    The Qur'an does not give a detailed account of Yunus's
                    childhood. It focuses on his prophetic mission and trial.
                </p>
            `,

            call: `
                <p>
                    Yunus called his people to Allah. His people eventually
                    believed and were spared the punishment that had been
                    threatened.
                </p>
            `,

            events: `
                <p>
                    Yunus departed and boarded a ship. After the casting of lots,
                    he was thrown into the sea and swallowed by a great fish.
                </p>

                <p>
                    In the darkness, Yunus called upon Allah and acknowledged
                    Allah's perfection and his own wrongdoing.
                </p>

                <p>
                    Allah answered him, saved him and restored him.
                </p>
            `,

            trials: `
                <p>
                    Yunus experienced the hardship of the sea and the darkness
                    inside the fish. His response was sincere remembrance and
                    repentance.
                </p>
            `,

            miracles: `
                <p>
                    Allah saved Yunus from the fish and caused him to recover.
                    His story demonstrates Allah's ability to rescue His servant
                    from extraordinary circumstances.
                </p>
            `,

            ending: `
                <p>
                    Yunus returned to his people and found them believing.
                    Allah's mercy was shown both to Yunus and to his people.
                </p>
            `,

            lessons: [
                "Turn to Allah immediately when you recognize a mistake.",
                "Supplication can be a source of rescue during hardship.",
                "Never despair of Allah's mercy.",
                "Allah can forgive and restore His servant."
            ],

            references: [
                "Yunus 10:98",
                "Al-Anbiya 21:87–88",
                "As-Saffat 37:139–148",
                "Al-Qalam 68:48–50"
            ],

            authenticity:
                "The Qur'an provides the primary account of Yunus and his trial with the fish."
        },


        {
            id: "zakariyya",
            number: 22,
            name: "Zakariyya",
            arabic: "زكريا",
            title: "The Prophet Who Supplicated for a Child",
            icon: "🤲",
            categories: ["quran"],

            description:
                "A righteous prophet whose sincere supplication was answered with Yahya.",

            introduction: `
                <p>
                    Prophet Zakariyya (peace be upon him) was a righteous servant
                    of Allah who cared for Maryam and served Allah with devotion.
                </p>

                <p>
                    His story is especially known for his heartfelt supplication
                    for a righteous child.
                </p>
            `,

            earlyLife: `
                <p>
                    The Qur'an does not provide a complete biography of
                    Zakariyya's early life.
                </p>
            `,

            call: `
                <p>
                    Zakariyya was devoted to worship and responsible for caring
                    for Maryam.
                </p>
            `,

            events: `
                <p>
                    When Zakariyya witnessed the special provision Allah gave
                    Maryam, he turned to Allah in private supplication and asked
                    for a righteous heir.
                </p>

                <p>
                    Allah gave him the good news of Yahya.
                </p>
            `,

            trials: `
                <p>
                    Zakariyya had reached old age and his wife had been unable to
                    have children, yet he did not consider Allah's power limited
                    by circumstances.
                </p>
            `,

            miracles: `
                <p>
                    The birth of Yahya to Zakariyya and his wife was a clear sign
                    of Allah's power.
                </p>
            `,

            ending: `
                <p>
                    Zakariyya was blessed with Yahya, and Allah praised the
                    family for their righteousness and eagerness to do good.
                </p>
            `,

            lessons: [
                "Never stop asking Allah for what is good.",
                "Private supplication can be deeply sincere.",
                "Allah's power is greater than apparent circumstances.",
                "Righteous children are a great blessing."
            ],

            references: [
                "Al-Anbiya 21:89–90",
                "Maryam 19:2–15",
                "Aal Imran 3:37–41"
            ],

            authenticity:
                "The account follows the Qur'anic narrative of Zakariyya and Yahya."
        },


        {
            id: "yahya",
            number: 23,
            name: "Yahya",
            arabic: "يحيى",
            title: "The Pure and Righteous Prophet",
            icon: "🌿",
            categories: ["quran"],

            description:
                "A prophet whom Allah blessed with wisdom, purity and devotion from a young age.",

            introduction: `
                <p>
                    Prophet Yahya (peace be upon him) was the son of Zakariyya.
                    Allah gave him wisdom while he was still young and described
                    him as pure and righteous.
                </p>
            `,

            earlyLife: `
                <p>
                    Allah gave Yahya his name before his birth and blessed him
                    with wisdom and compassion.
                </p>
            `,

            call: `
                <p>
                    Yahya remained devoted to Allah and supported the truth.
                </p>
            `,

            events: `
                <p>
                    The Qur'an praises Yahya for holding firmly to the scripture
                    and for possessing compassion, purity and righteousness.
                </p>
            `,

            trials: `
                <p>
                    The Qur'an does not give an extensive account of Yahya's
                    personal trials, so we avoid presenting uncertain historical
                    details as established facts.
                </p>
            `,

            miracles: `
                <p>
                    His miraculous birth announcement was itself a sign of
                    Allah's power, given the circumstances of his parents.
                </p>
            `,

            ending: `
                <p>
                    Allah praised Yahya as a righteous servant and gave him
                    peace on the day he was born, the day he dies and the day he
                    is raised alive.
                </p>
            `,

            lessons: [
                "Wisdom can be granted even at a young age.",
                "Purity and self-control are important qualities.",
                "Compassion should accompany religious commitment.",
                "Hold firmly to Allah's revelation."
            ],

            references: [
                "Aal Imran 3:38–41",
                "Maryam 19:7–15",
                "Al-An'am 6:85"
            ],

            authenticity:
                "The account is based on the Qur'anic descriptions of Yahya."
        },


        {
            id: "isa",
            number: 24,
            name: "Isa",
            arabic: "عيسى",
            title: "The Messiah and Messenger of Allah",
            icon: "✨",
            categories: ["quran", "ulul-azm"],

            description:
                "The Messiah, born miraculously to Maryam and sent as a messenger to the Children of Israel.",

            introduction: `
                <p>
                    Prophet Isa (peace be upon him) is the Messiah and one of
                    the greatest messengers of Allah. His birth was miraculous,
                    and Allah gave him extraordinary signs by His permission.
                </p>

                <p>
                    Islam honors Isa while affirming that he was a servant and
                    messenger of Allah, not Allah Himself.
                </p>
            `,

            earlyLife: `
                <p>
                    Isa was born to Maryam without a human father. Allah
                    announced his birth through the angels and honored Maryam.
                </p>

                <p>
                    Isa spoke while still an infant, declaring himself a servant
                    of Allah and describing the blessings Allah had given him.
                </p>
            `,

            call: `
                <p>
                    Isa called the Children of Israel to worship Allah and
                    confirmed the revelation that came before him.
                </p>
            `,

            events: `
                <p>
                    Isa performed signs by Allah's permission, including healing
                    certain illnesses and bringing the dead back to life by
                    Allah's permission.
                </p>

                <p>
                    He called people to worship Allah alone and taught wisdom
                    and guidance.
                </p>
            `,

            trials: `
                <p>
                    Isa faced rejection and opposition from some of his people.
                    His mission required patience and reliance upon Allah.
                </p>
            `,

            miracles: `
                <p>
                    The Qur'an mentions several signs given to Isa by Allah's
                    permission, including speaking in the cradle, healing the
                    blind and leper, and bringing the dead to life by Allah's
                    permission.
                </p>
            `,

            ending: `
                <p>
                    The Qur'an states that Isa was not killed or crucified in the
                    manner his enemies claimed. Allah raised him to Himself.
                </p>

                <p>
                    Muslims believe that Isa will return before the Day of
                    Judgment, according to authentic prophetic teachings.
                </p>
            `,

            lessons: [
                "Allah's power is beyond human limitations.",
                "Miracles happen only by Allah's permission.",
                "Prophets are servants and messengers of Allah.",
                "Maryam and Isa hold an honored position in Islam.",
                "True faith requires following revelation rather than speculation."
            ],

            references: [
                "Aal Imran 3:45–63",
                "Maryam 19:16–36",
                "Al-Ma'idah 5:72–75",
                "Al-Ma'idah 5:110–120",
                "An-Nisa 4:157–159"
            ],

            authenticity:
                "This account follows the Qur'an and authentic Islamic teachings. It deliberately avoids adopting theological claims about Isa that conflict with Islamic revelation."
        },


        {
            id: "muhammad",
            number: 25,
            name: "Muhammad",
            arabic: "محمد ﷺ",
            title: "The Final Messenger of Allah",
            icon: "🕌",
            categories: ["quran", "ulul-azm"],

            description:
                "The final Messenger of Allah, sent as a mercy and guidance for humanity.",

            introduction: `
                <p>
                    Prophet Muhammad ﷺ is the final messenger of Allah and the
                    last prophet. His message completed the chain of prophetic
                    guidance and brought the Qur'an as the final revelation.
                </p>

                <p>
                    His life contains lessons in worship, patience, mercy,
                    leadership, courage, forgiveness and reliance upon Allah.
                </p>
            `,

            earlyLife: `
                <p>
                    Muhammad ﷺ was born in Makkah and belonged to Quraysh.
                    He lost both parents while young and was cared for by family
                    members.
                </p>

                <p>
                    Before prophethood, he became known among his people for
                    trustworthy character.
                </p>
            `,

            call: `
                <p>
                    At the age of forty, Muhammad ﷺ received the first
                    revelation through Jibril. He was commanded to convey the
                    message of his Lord.
                </p>

                <p>
                    He called humanity to worship Allah alone, abandon
                    idolatry, establish prayer, give charity and live according
                    to righteousness.
                </p>
            `,

            events: `
                <p>
                    The early Muslims faced persecution in Makkah. Some migrated
                    to Abyssinia, and later the Muslims migrated to Madinah.
                </p>

                <p>
                    In Madinah, the Prophet ﷺ established a community based on
                    faith, justice and mutual responsibility.
                </p>

                <p>
                    Major events included the battles of Badr, Uhud and the
                    Trench, the Treaty of Hudaybiyyah, and eventually the
                    peaceful conquest of Makkah.
                </p>

                <p>
                    Near the end of his life, he delivered guidance to the
                    Muslim community and emphasized responsibility, justice,
                    worship and good treatment of others.
                </p>
            `,

            trials: `
                <p>
                    The Prophet ﷺ experienced rejection, mockery, persecution,
                    loss of loved ones, war and betrayal.
                </p>

                <p>
                    Despite these hardships, he continued calling people toward
                    Allah and demonstrated patience and mercy.
                </p>
            `,

            miracles: `
                <p>
                    The greatest continuing miracle given to Muhammad ﷺ is the
                    Qur'an.
                </p>

                <p>
                    Authentic prophetic teachings also record other miracles,
                    but the Qur'an remains the central lasting sign of his
                    prophethood.
                </p>
            `,

            ending: `
                <p>
                    Muhammad ﷺ passed away in Madinah after completing his
                    mission. He left the Muslim community with the Qur'an and
                    his Sunnah as sources of guidance.
                </p>

                <p>
                    Muslims believe that he is the final prophet and that no
                    prophet will come after him.
                </p>
            `,

            lessons: [
                "Worship Allah alone.",
                "Patience is essential when facing hardship.",
                "Mercy and forgiveness are powerful qualities.",
                "Leadership requires justice and responsibility.",
                "The Qur'an is the final revelation.",
                "Follow the Prophet ﷺ with love, respect and obedience."
            ],

            references: [
                "Al-Ahzab 33:40",
                "Al-Anbiya 21:107",
                "Al-Fath 48:1–29",
                "Ad-Duha 93:1–11",
                "Ash-Sharh 94:1–8"
            ],

            authenticity:
                "The account should be studied through the Qur'an and authentic Sunnah. For detailed biography, IQRANIX should prioritize reliable Seerah sources and authentic hadith rather than unsupported popular stories."
        }

    ];


    /* =====================================================
       STATE
    ===================================================== */

    let currentFilter = "all";

    let currentSearch = "";

    let currentProphetIndex = -1;

    let bookmarks = loadBookmarks();

    let textSize =
        Number(
            localStorage.getItem(
                TEXT_SIZE_STORAGE
            )
        ) || 17;


    /* =====================================================
       BOOKMARK STORAGE
    ===================================================== */

    function loadBookmarks() {

        try {

            const saved =
                localStorage.getItem(
                    BOOKMARK_STORAGE
                );

            if (!saved) {
                return [];
            }

            const parsed =
                JSON.parse(saved);

            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.error(
                "Unable to load bookmarks:",
                error
            );

            return [];

        }

    }


    function saveBookmarks() {

        try {

            localStorage.setItem(
                BOOKMARK_STORAGE,
                JSON.stringify(bookmarks)
            );

        } catch (error) {

            console.error(
                "Unable to save bookmarks:",
                error
            );

        }

    }


    function isBookmarked(id) {

        return bookmarks.includes(id);

    }


    function toggleBookmark(id) {

        if (isBookmarked(id)) {

            bookmarks =
                bookmarks.filter(
                    item => item !== id
                );

            showToast(
                "Story removed from bookmarks."
            );

        } else {

            bookmarks.push(id);

            showToast(
                "Story saved to bookmarks. 🔖"
            );

        }

        saveBookmarks();

        renderProphets();

        updateStoryBookmark();

        renderBookmarks();

    }


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        if (!toast) {
            return;
        }

        toast.textContent =
            message;

        toast.classList.add(
            "show"
        );

        clearTimeout(
            showToast.timer
        );

        showToast.timer =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                2600
            );

    }


    /* =====================================================
       FIND PROPHET
    ===================================================== */

    function getProphetById(id) {

        return PROPHETS.find(
            prophet =>
                prophet.id === id
        );

    }


    /* =====================================================
       FILTERING
    ===================================================== */

    function getFilteredProphets() {

        let results =
            [...PROPHETS];


        if (
            currentFilter ===
            "bookmarked"
        ) {

            results =
                results.filter(
                    prophet =>
                        isBookmarked(
                            prophet.id
                        )
                );

        } else if (
            currentFilter !==
            "all"
        ) {

            results =
                results.filter(
                    prophet =>
                        prophet.categories.includes(
                            currentFilter
                        )
                );

        }


        if (currentSearch) {

            const query =
                currentSearch.toLowerCase();

            results =
                results.filter(
                    prophet => {

                        const searchable =
                            [
                                prophet.name,
                                prophet.arabic,
                                prophet.title,
                                prophet.description
                            ]
                                .join(" ")
                                .toLowerCase();

                        return searchable.includes(
                            query
                        );

                    }
                );

        }


        return results;

    }


    /* =====================================================
       RENDER PROPHET CARDS
    ===================================================== */

    function renderProphets() {

        if (!prophetList) {
            return;
        }


        const results =
            getFilteredProphets();


        prophetList.innerHTML =
            "";


        if (prophetCount) {

            prophetCount.textContent =
                `${results.length} ${
                    results.length === 1
                        ? "Prophet"
                        : "Prophets"
                }`;

        }


        if (!results.length) {

            if (noResults) {
                noResults.hidden = false;
            }

            return;

        }


        if (noResults) {
            noResults.hidden = true;
        }


        results.forEach(
            prophet => {

                const card =
                    document.createElement(
                        "article"
                    );

                card.className =
                    "prophet-card";


                const saved =
                    isBookmarked(
                        prophet.id
                    );


                const category =
                    prophet.categories.includes(
                        "ulul-azm"
                    )
                        ? "Ulul Azm"
                        : "Prophet";


                card.innerHTML = `

                    <button
                        class="card-bookmark ${
                            saved
                                ? "saved"
                                : ""
                        }"
                        type="button"
                        aria-label="${
                            saved
                                ? "Remove bookmark"
                                : "Bookmark story"
                        }"
                        data-bookmark="${
                            prophet.id
                        }"
                    >
                        ${
                            saved
                                ? "🔖"
                                : "♡"
                        }
                    </button>

                    <div class="prophet-card-top">

                        <div class="prophet-card-icon">
                            ${prophet.icon}
                        </div>

                        <div class="prophet-card-info">

                            <h3>
                                ${escapeHTML(
                                    prophet.name
                                )} (AS)
                            </h3>

                            <div
                                class="prophet-arabic"
                            >
                                ${escapeHTML(
                                    prophet.arabic
                                )}
                            </div>

                        </div>

                    </div>

                    <p
                        class="prophet-card-description"
                    >
                        ${escapeHTML(
                            prophet.description
                        )}
                    </p>

                    <div
                        class="prophet-card-footer"
                    >

                        <span
                            class="prophet-category"
                        >
                            ${category}
                        </span>

                        <button
                            class="read-story-button"
                            type="button"
                            data-prophet="${
                                prophet.id
                            }"
                        >
                            Read Story
                        </button>

                    </div>
                `;


                const bookmark =
                    card.querySelector(
                        "[data-bookmark]"
                    );


                if (bookmark) {

                    bookmark.addEventListener(
                        "click",
                        event => {

                            event.stopPropagation();

                            toggleBookmark(
                                prophet.id
                            );

                        }
                    );

                }


                const readButton =
                    card.querySelector(
                        "[data-prophet]"
                    );


                if (readButton) {

                    readButton.addEventListener(
                        "click",
                        () => {

                            openStory(
                                prophet.id
                            );

                        }
                    );

                }


                prophetList.appendChild(
                    card
                );

            }
        );

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       STORY OPEN
    ===================================================== */

    function openStory(id) {

        const index =
            PROPHETS.findIndex(
                prophet =>
                    prophet.id === id
            );


        if (index === -1) {
            return;
        }


        currentProphetIndex =
            index;


        const prophet =
            PROPHETS[index];


        renderStory(
            prophet
        );


        if (prophetList) {
            prophetList.hidden = true;
        }

        if (noResults) {
            noResults.hidden = true;
        }

        if (storyReader) {
            storyReader.hidden = false;
        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       RENDER STORY
    ===================================================== */

    function renderStory(prophet) {

        if (!prophet) {
            return;
        }


        if (storyArabicName) {

            storyArabicName.textContent =
                prophet.arabic;

        }


        if (storyTitle) {

            storyTitle.textContent =
                `${prophet.name} (AS)`;

        }


        if (storySubtitle) {

            storySubtitle.textContent =
                prophet.title;

        }


        if (storyIcon) {

            storyIcon.textContent =
                prophet.icon;

        }


        if (storyHeroName) {

            storyHeroName.textContent =
                `${prophet.name} (AS)`;

        }


        if (storyHeroDescription) {

            storyHeroDescription.textContent =
                prophet.description;

        }


        if (storyIntroduction) {

            storyIntroduction.innerHTML =
                prophet.introduction || "";

        }


        if (earlyLifeSection) {

            if (
                prophet.earlyLife &&
                prophet.earlyLife.trim()
            ) {

                earlyLifeSection.hidden =
                    false;

            } else {

                earlyLifeSection.hidden =
                    true;

            }

        }


        if (storyEarlyLife) {

            storyEarlyLife.innerHTML =
                prophet.earlyLife || "";

        }


        if (storyCall) {

            storyCall.innerHTML =
                prophet.call || "";

        }


        if (storyEvents) {

            storyEvents.innerHTML =
                prophet.events || "";

        }


        if (storyTrials) {

            storyTrials.innerHTML =
                prophet.trials || "";

        }


        if (storyMiracles) {

            storyMiracles.innerHTML =
                prophet.miracles || "";

        }


        if (storyEnding) {

            storyEnding.innerHTML =
                prophet.ending || "";

        }


        renderLessons(
            prophet.lessons
        );


        renderReferences(
            prophet.references
        );


        if (authenticityText) {

            authenticityText.textContent =
                prophet.authenticity || "";

        }


        if (storyProgress) {

            storyProgress.textContent =
                `${currentProphetIndex + 1} / ${
                    PROPHETS.length
                }`;

        }


        updateStoryBookmark();

        updateNavigationButtons();

        applyTextSize();

    }


    /* =====================================================
       LESSONS
    ===================================================== */

    function renderLessons(lessons) {

        if (!storyLessons) {
            return;
        }


        storyLessons.innerHTML =
            "";


        if (
            !Array.isArray(lessons)
        ) {
            return;
        }


        lessons.forEach(
            lesson => {

                const li =
                    document.createElement(
                        "li"
                    );

                li.textContent =
                    lesson;

                storyLessons.appendChild(
                    li
                );

            }
        );

    }


    /* =====================================================
       QURAN REFERENCES
    ===================================================== */

    function renderReferences(
        references
    ) {

        if (!quranReferences) {
            return;
        }


        quranReferences.innerHTML =
            "";


        if (
            !Array.isArray(references)
        ) {
            return;
        }


        references.forEach(
            reference => {

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "quran-reference";

                item.textContent =
                    reference;

                quranReferences.appendChild(
                    item
                );

            }
        );

    }


    /* =====================================================
       STORY BOOKMARK
    ===================================================== */

    function updateStoryBookmark() {

        if (
            currentProphetIndex < 0 ||
            !storyBookmark
        ) {
            return;
        }


        const prophet =
            PROPHETS[
                currentProphetIndex
            ];


        const saved =
            isBookmarked(
                prophet.id
            );


        storyBookmark.textContent =
            saved
                ? "🔖"
                : "♡";


        storyBookmark.setAttribute(
            "aria-label",
            saved
                ? "Remove bookmark"
                : "Bookmark story"
        );

    }


    /* =====================================================
       STORY NAVIGATION
    ===================================================== */

    function updateNavigationButtons() {

        const first =
            currentProphetIndex <= 0;

        const last =
            currentProphetIndex >=
            PROPHETS.length - 1;


        [
            previousProphet,
            bottomPrevious
        ].forEach(
            button => {

                if (button) {

                    button.disabled =
                        first;

                    button.style.opacity =
                        first
                            ? "0.45"
                            : "";

                }

            }
        );


        [
            nextProphet,
            bottomNext
        ].forEach(
            button => {

                if (button) {

                    button.disabled =
                        last;

                    button.style.opacity =
                        last
                            ? "0.45"
                            : "";

                }

            }
        );

    }


    function openPreviousStory() {

        if (
            currentProphetIndex <= 0
        ) {
            return;
        }


        currentProphetIndex--;

        renderStory(
            PROPHETS[
                currentProphetIndex
            ]
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    function openNextStory() {

        if (
            currentProphetIndex >=
            PROPHETS.length - 1
        ) {
            return;
        }


        currentProphetIndex++;

        renderStory(
            PROPHETS[
                currentProphetIndex
            ]
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       CLOSE STORY
    ===================================================== */

    function closeStoryReader() {

        if (storyReader) {
            storyReader.hidden = true;
        }

        if (prophetList) {
            prophetList.hidden = false;
        }


        currentProphetIndex =
            -1;


        renderProphets();


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    function performSearch() {

        currentSearch =
            prophetSearch
                ? prophetSearch.value.trim()
                : "";


        renderProphets();

    }


    if (prophetSearch) {

        prophetSearch.addEventListener(
            "input",
            performSearch
        );

    }


    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            () => {

                if (prophetSearch) {

                    prophetSearch.value =
                        "";

                }

                currentSearch =
                    "";

                renderProphets();

            }
        );

    }


    if (resetSearch) {

        resetSearch.addEventListener(
            "click",
            () => {

                currentSearch =
                    "";

                currentFilter =
                    "all";


                if (prophetSearch) {

                    prophetSearch.value =
                        "";

                }


                filterButtons.forEach(
                    button => {

                        button.classList.toggle(
                            "active",
                            button.dataset.filter ===
                                "all"
                        );

                    }
                );


                renderProphets();

            }
        );

    }


    /* =====================================================
       FILTER BUTTONS
    ===================================================== */

    filterButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    currentFilter =
                        button.dataset.filter ||
                        "all";


                    filterButtons.forEach(
                        item => {

                            item.classList.toggle(
                                "active",
                                item === button
                            );

                        }
                    );


                    renderProphets();

                }
            );

        }
    );


    /* =====================================================
       BOOKMARK PANEL
    ===================================================== */

    function openBookmarksPanel() {

        if (!bookmarksPanel) {
            return;
        }


        bookmarksPanel.classList.add(
            "open"
        );

        bookmarksPanel.setAttribute(
            "aria-hidden",
            "false"
        );


        renderBookmarks();

    }


    function closeBookmarksPanel() {

        if (!bookmarksPanel) {
            return;
        }


        bookmarksPanel.classList.remove(
            "open"
        );

        bookmarksPanel.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (bookmarkButton) {

        bookmarkButton.addEventListener(
            "click",
            openBookmarksPanel
        );

    }


    if (closeBookmarks) {

        closeBookmarks.addEventListener(
            "click",
            closeBookmarksPanel
        );

    }


    /* =====================================================
       RENDER BOOKMARKS
    ===================================================== */

    function renderBookmarks() {

        if (!bookmarksList) {
            return;
        }


        bookmarksList.innerHTML =
            "";


        const savedProphets =
            PROPHETS.filter(
                prophet =>
                    isBookmarked(
                        prophet.id
                    )
            );


        if (!savedProphets.length) {

            if (emptyBookmarks) {
                emptyBookmarks.hidden =
                    false;
            }

            return;

        }


        if (emptyBookmarks) {
            emptyBookmarks.hidden =
                true;
        }


        savedProphets.forEach(
            prophet => {

                const button =
                    document.createElement(
                        "button"
                    );

                button.type =
                    "button";

                button.className =
                    "bookmark-item";


                button.innerHTML = `

                    <div
                        class="bookmark-item-icon"
                    >
                        ${prophet.icon}
                    </div>

                    <div
                        class="bookmark-item-info"
                    >

                        <h3>
                            ${escapeHTML(
                                prophet.name
                            )} (AS)
                        </h3>

                        <p>
                            ${escapeHTML(
                                prophet.title
                            )}
                        </p>

                    </div>

                `;


                button.addEventListener(
                    "click",
                    () => {

                        closeBookmarksPanel();

                        openStory(
                            prophet.id
                        );

                    }
                );


                bookmarksList.appendChild(
                    button
                );

            }
        );

    }


    /* =====================================================
       READING TEXT SIZE
    ===================================================== */

    function applyTextSize() {

        const size =
            Math.max(
                14,
                Math.min(
                    23,
                    textSize
                )
            );


        textSize =
            size;


        document.documentElement.style.setProperty(
            "--story-size",
            `${size}px`
        );


        try {

            localStorage.setItem(
                TEXT_SIZE_STORAGE,
                String(size)
            );

        } catch (error) {

            console.warn(
                "Unable to save text size."
            );

        }

    }


    if (decreaseText) {

        decreaseText.addEventListener(
            "click",
            () => {

                textSize -= 1;

                applyTextSize();

            }
        );

    }


    if (increaseText) {

        increaseText.addEventListener(
            "click",
            () => {

                textSize += 1;

                applyTextSize();

            }
        );

    }


    /* =====================================================
       STORY BOOKMARK BUTTON
    ===================================================== */

    if (storyBookmark) {

        storyBookmark.addEventListener(
            "click",
            () => {

                if (
                    currentProphetIndex < 0
                ) {
                    return;
                }


                const prophet =
                    PROPHETS[
                        currentProphetIndex
                    ];


                toggleBookmark(
                    prophet.id
                );

            }
        );

    }


    /* =====================================================
       STORY NAVIGATION BUTTONS
    ===================================================== */

    if (previousProphet) {

        previousProphet.addEventListener(
            "click",
            openPreviousStory
        );

    }


    if (bottomPrevious) {

        bottomPrevious.addEventListener(
            "click",
            openPreviousStory
        );

    }


    if (nextProphet) {

        nextProphet.addEventListener(
            "click",
            openNextStory
        );

    }


    if (bottomNext) {

        bottomNext.addEventListener(
            "click",
            openNextStory
        );

    }


    if (closeStory) {

        closeStory.addEventListener(
            "click",
            closeStoryReader
        );

    }


    /* =====================================================
       BACK BUTTON
    ===================================================== */

    if (backButton) {

        backButton.addEventListener(
            "click",
            () => {

                if (
                    storyReader &&
                    !storyReader.hidden
                ) {

                    closeStoryReader();

                    return;

                }


                if (
                    window.history.length > 1
                ) {

                    window.history.back();

                } else {

                    window.location.href =
                        "index.html";

                }

            }
        );

    }


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                currentProphetIndex < 0
            ) {
                return;
            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                openPreviousStory();

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                openNextStory();

            }


            if (
                event.key ===
                "Escape"
            ) {

                closeStoryReader();

            }

        }
    );


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    applyTextSize();

    renderProphets();

    renderBookmarks();


    console.log(
        "IQRANIX Prophets & Messengers loaded."
    );

});