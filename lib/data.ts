import { SearchResult, Hadith, WisdomQuote, AudioRecitation, MapLocation } from "./types"

export const searchData: SearchResult[] = [
    {
        title: "Kelahiran Nabi Muhammad ﷺ",
        year: "571 M",
        phase: "Awalan",
        description: "Lahir di Makkah pada tahun Gajah",
    },
    {
        title: "Wahyu Pertama",
        year: "610 M",
        phase: "Makkah",
        description: "Turunnya wahyu pertama di Gua Hira"
    },
    {
        title: "Hijrah ke Madinah",
        year: "622 M",
        phase: "Madinah",
        description: "Perpindahan dari Makkah ke Madinah"
    },
    {
        title: "Perang Badr",
        year: "624 M",
        phase: "Madinah",
        description: "Kemenangan pertama kaum muslim"
    },
    {
        title: "Fathu Makkah",
        year: "630 M",
        phase: "Madinah",
        description: "Pembebasan Makkah tanpa pertumpahan darah"
    },
    {
        title: "Haji Wada'",
        year: "632 M",
        phase: "Madinah",
        description: "Haji perpisahan dan khutbah terakhir"
    },
]

export const phasesData = {
    "pre-prophethood": {
        title: "Fase Awalan",
        subtitle: "Sebelum Kenabian (0-40 Tahun)",
        description: "Masa kelahiran, pertumbuhan, dan persiapan sebelum diangkat menjadi Rasul",
        periods: [
            {
                title: "Kelahiran & Masa Bayi",
                years: "0-2 Tahun",
                events: [
                    {
                        year: "570 M",
                        title: "Dalam Kandungan & Wafat Ayahanda",
                        description:
                            "Saat beliau masih berada dalam kandungan ibunda tercinta Aminah, bertepatan dengan wafatnya Ayahanda tercinta Abdullah.",
                        image: "https://i.pinimg.com/736x/5d/c4/f9/5dc4f980a8fe3bdd82996dcb3f32c434.jpg",
                        quote: {
                            arabic: "أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ",
                            translation: "Bukankah Dia mendapatimu sebagai seorang yatim, lalu Dia melindungimu?",
                            source: "QS. Ad-Dhuha: 6"
                        },
                        hikmah: [
                            "Allah mempersiapkan Nabi ﷺ dengan kemandirian sejak dalam kandungan.",
                            "Ujian hidup (yatim) adalah bentuk kasih sayang Allah untuk menguatkan mental."
                        ],
                        tokoh: [
                            { name: "Aminah binti Wahb", role: "Ibunda Nabi", initials: "AW" },
                            { name: "Abdullah", role: "Ayahanda Nabi", initials: "AB" }
                        ]
                    },
                    {
                        year: "571 M",
                        title: "Kelahiran di Tahun Gajah",
                        description:
                            "Beliau dilahirkan pada 12 Rabiul Awwal (20-22 April 571 M) bertepatan dengan penyerangan Ka'bah oleh pasukan bergajah Abrahah. Terjadi kejadian aneh: runtuhnya 10 balkon istana Kisra, padamnya api Majusi, dan runtuhnya gereja di Buhairah. Abdul Muthalib membawa cucunya ke Ka'bah untuk berdoa dan bersyukur.",
                    },
                    {
                        year: "571 M",
                        title: "Hari ke-7: Khitan",
                        description:
                            "Pada hari ke-7 setelah dilahirkan, beliau dikhitan/disunat seperti kebiasaan orang Arab pada masa itu.",
                    },
                ],
            },
            {
                title: "Masa dengan Ibu Susuan",
                years: "2-6 Tahun",
                events: [
                    {
                        year: "573 M",
                        title: "Kembali dari Halimah (Usia 2 Tahun)",
                        description:
                            "Saat usia dua tahun, beliau dikembalikan oleh Halimah As-Sa'diyah kepada ibunda setelah selesai masa kontrak menyusuinya.",
                    },
                    {
                        year: "573-575 M",
                        title: "Kembali ke Halimah (Usia 2-4 Tahun)",
                        description:
                            "Halimah meminta kembali untuk merawat beliau setelah melihat hal-hal yang membuatnya senang untuk menyusuinya, hingga usia 4 tahun.",
                    },
                    {
                        year: "575 M",
                        title: "Peristiwa Pembelahan Dada",
                        description:
                            "Setelah dua tahun dirawat Halimah, ia mengembalikan beliau kepada ibundanya setelah mendengar kejadian pembelahan dada oleh Malaikat Jibril dari teman sebayanya.",
                    },
                    {
                        year: "577 M",
                        title: "Wafat Ibunda Aminah (Usia 6 Tahun)",
                        description:
                            "Ibunda Aminah wafat di Abwa saat perjalanan pulang ke Makkah setelah berziarah ke makam Ayahanda di Madinah. Sejak itu beliau dirawat kakek Abdul Muthalib.",
                    },
                ],
            },
            {
                title: "Masa dengan Kakek & Paman",
                years: "6-25 Tahun",
                events: [
                    {
                        year: "577-579 M",
                        title: "Dirawat Abdul Muthalib (Usia 6-8 Tahun)",
                        description:
                            "Beliau dirawat kakeknya Abdul Muthalib yang memberikan perlakuan istimewa, bahkan membolehkan beliau duduk di dipannya yang tidak boleh diduduki orang lain, karena melihat kemuliaan istimewa pada cucunya.",
                    },
                    {
                        year: "579 M",
                        title: "Wafat Abdul Muthalib (Usia 8 Tahun 2 Bulan 10 Hari)",
                        description:
                            "Abdul Muthalib wafat saat beliau berusia 8 tahun 2 bulan 10 hari. Sejak itu beliau dialihkan kepada pamannya Abu Thalib yang lebih mendahulukan kepentingan ponakannya daripada anak-anaknya sendiri.",
                    },
                    {
                        year: "583 M",
                        title: "Perjalanan Dagang ke Syam Pertama (Usia 12 Tahun)",
                        description:
                            "Beliau ikut Abu Thalib berdagang ke Syam. Di Bushra bertemu Rahib Bahira (Jurjis) yang melihat tanda kenabian di punggung beliau dan menyarankan agar segera pulang. Abu Thalib mengirim beliau kembali ke Makkah bersama beberapa pemuda.",
                    },
                    {
                        year: "586 M",
                        title: "Ikut Perang Fijar (Usia 15 Tahun)",
                        description:
                            "Beliau ikut Perang Fijar dengan tugas mengumpulkan anak panah dan memberikannya kepada paman-pamannya.",
                    },
                    {
                        year: "595 M",
                        title: "Perjalanan Dagang untuk Khadijah (Usia 25 Tahun)",
                        description:
                            "Beliau berdagang ke Syam membawa barang dagangan Khadijah binti Khuwailid, ditemani Maisaroh. Khadijah terkesan dengan kejujuran dan kebagusan beliau dalam berdagang, lalu menyuruh Nafisah binti Munyah untuk menyampaikan keinginannya menikah dengan beliau.",
                    },
                ],
            },
            {
                title: "Masa Pernikahan & Kedewasaan",
                years: "25-40 Tahun",
                events: [
                    {
                        year: "595 M",
                        title: "Menikah dengan Khadijah (Usia 25 Tahun)",
                        description:
                            "Beliau menikah dengan Khadijah binti Khuwailid yang berusia 40 tahun. Pernikahan ini dilangsungkan setelah paman-paman beliau mengajukan lamaran kepada keluarga Khadijah.",
                    },
                    {
                        year: "605 M",
                        title: "Arbitrase Hajar Aswad (Usia 35 Tahun)",
                        description:
                            "Saat renovasi Ka'bah, terjadi sengketa antar suku tentang siapa yang berhak meletakkan Hajar Aswad. Beliau menyelesaikan masalah ini dengan bijaksana menggunakan kain dan meminta setiap suku memegang ujungnya.",
                    },
                    {
                        year: "610 M",
                        title: "Kontemplasi di Gua Hira (Usia 40 Tahun)",
                        description:
                            "Menjelang usia 40 tahun, beliau sering berkhalwat dan bercontemplasi di Gua Hira, mempersiapkan diri untuk menerima wahyu pertama dan amanah kenabian.",
                    },
                ],
            },
        ],
    },
    makkah: {
        title: "Fase Makkah",
        subtitle: "Periode Dakwah (13 Tahun)",
        description: "Masa dakwah di Makkah dengan berbagai tantangan dan perjuangan",
        periods: [
            {
                title: "Periode I: Dakwah Sirr",
                years: "610-613 M (3 Tahun)",
                events: [
                    { year: "610 M", title: "Wahyu Pertama", description: "Turunnya wahyu pertama di Gua Hira" },
                    { year: "610 M", title: "Khadijah Masuk Islam", description: "Khadijah menjadi muslimah pertama" },
                    {
                        year: "611 M",
                        title: "Abu Bakar Masuk Islam",
                        description: "Abu Bakar menjadi muslim pertama dari kalangan pria",
                    },
                ],
            },
            {
                title: "Periode II: Dakwah Jahr",
                years: "613-616 M (3 Tahun)",
                events: [
                    { year: "613 M", title: "Dakwah Terbuka", description: "Mulai berdakwah secara terbuka" },
                    { year: "614 M", title: "Penyiksaan Muslim", description: "Mulai terjadi penyiksaan terhadap kaum muslim" },
                    { year: "615 M", title: "Hijrah ke Habasyah I", description: "Hijrah pertama ke Habasyah" },
                ],
            },
            {
                title: "Periode III: Perlawanan",
                years: "616-619 M (3 Tahun)",
                events: [
                    { year: "616 M", title: "Boikot Bani Hasyim", description: "Boikot ekonomi dan sosial terhadap Bani Hasyim" },
                    { year: "617 M", title: "Hijrah ke Habasyah II", description: "Hijrah kedua ke Habasyah" },
                    { year: "619 M", title: "Tahun Duka", description: "Wafat Abu Thalib dan Khadijah" },
                ],
            },
            {
                title: "Periode IV: Persiapan Hijrah",
                years: "619-622 M (4 Tahun)",
                events: [
                    { year: "620 M", title: "Dakwah ke Thaif", description: "Perjalanan dakwah ke Thaif" },
                    { year: "621 M", title: "Isra Mi'raj", description: "Perjalanan malam dan naik ke langit" },
                    { year: "622 M", title: "Bai'at Aqabah", description: "Perjanjian dengan penduduk Madinah" },
                ],
            },
        ],
    },
    madinah: {
        title: "Fase Madinah",
        subtitle: "Periode Pembentukan Negara (10 Tahun)",
        description: "Masa pembentukan masyarakat Islam dan penyebaran dakwah",
        periods: [
            {
                title: "Periode I: Pembentukan",
                years: "622-624 M (2 Tahun)",
                events: [
                    { year: "622 M", title: "Hijrah ke Madinah", description: "Perpindahan dari Makkah ke Madinah" },
                    { year: "622 M", title: "Pembangunan Masjid", description: "Membangun Masjid Nabawi" },
                    { year: "623 M", title: "Piagam Madinah", description: "Konstitusi pertama dalam Islam" },
                ],
            },
            {
                title: "Periode II: Konsolidasi",
                years: "624-627 M (3 Tahun)",
                events: [
                    { year: "624 M", title: "Perang Badr", description: "Kemenangan pertama kaum muslim" },
                    { year: "625 M", title: "Perang Uhud", description: "Ujian berat bagi kaum muslim" },
                    { year: "627 M", title: "Perang Khandaq", description: "Pertahanan Madinah dari serangan koalisi" },
                ],
            },
            {
                title: "Periode III: Ekspansi",
                years: "627-630 M (3 Tahun)",
                events: [
                    { year: "628 M", title: "Perjanjian Hudaibiyah", description: "Perjanjian damai dengan Makkah" },
                    { year: "629 M", title: "Umrah Qadha", description: "Pelaksanaan umrah yang tertunda" },
                    { year: "630 M", title: "Fathu Makkah", description: "Pembebasan Makkah tanpa pertumpahan darah" },
                ],
            },
            {
                title: "Periode IV: Penyempurnaan",
                years: "630-632 M (2 Tahun)",
                events: [
                    { year: "631 M", title: "Tahun Delegasi", description: "Banyak delegasi suku masuk Islam" },
                    { year: "632 M", title: "Haji Wada'", description: "Haji perpisahan dan khutbah terakhir" },
                    { year: "632 M", title: "Wafat Rasulullah", description: "Wafat pada usia 63 tahun" },
                ],
            },
        ],
    },
}

export const hadithData: Hadith[] = [
    {
        id: 1,
        arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
        translation:
            "Sesungguhnya setiap perbuatan tergantung niatnya, dan sesungguhnya setiap orang (akan dibalas) berdasarkan apa yang ia niatkan",
        narrator: "Umar bin Khattab",
        source: "Bukhari & Muslim",
        phase: "Madinah",
        category: "Akhlak",
        context: "Hadits tentang pentingnya niat dalam setiap perbuatan",
        lesson: "Setiap amal perbuatan harus didasari dengan niat yang ikhlas karena Allah SWT",
        favorite: false,
    },
    {
        id: 2,
        arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
        translation: "Seorang muslim adalah orang yang kaum muslimin selamat dari gangguan lisan dan tangannya",
        narrator: "Abdullah bin Amr",
        source: "Bukhari & Muslim",
        phase: "Madinah",
        category: "Akhlak",
        context: "Definisi muslim yang sejati menurut Rasulullah",
        lesson: "Muslim sejati adalah yang tidak menyakiti sesama dengan perkataan maupun perbuatan",
        favorite: false,
    },
    {
        id: 3,
        arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
        translation:
            "Tidak beriman seseorang di antara kalian hingga ia mencintai untuk saudaranya apa yang ia cintai untuk dirinya sendiri",
        narrator: "Anas bin Malik",
        source: "Bukhari & Muslim",
        phase: "Madinah",
        category: "Iman",
        context: "Kriteria kesempurnaan iman seorang muslim",
        lesson: "Iman yang sempurna ditandai dengan sikap saling mengasihi dan peduli sesama",
        favorite: false,
    },
    {
        id: 4,
        arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
        translation: "Barangsiapa beriman kepada Allah dan hari akhir, maka hendaklah ia berkata baik atau diam",
        narrator: "Abu Hurairah",
        source: "Bukhari & Muslim",
        phase: "Madinah",
        category: "Adab",
        context: "Etika berbicara dalam Islam",
        lesson: "Menjaga lisan adalah bagian dari keimanan kepada Allah dan hari akhir",
        favorite: false,
    },
    {
        id: 5,
        arabic: "الدِّينُ النَّصِيحَةُ",
        translation: "Agama itu adalah nasihat",
        narrator: "Tamim Ad-Dari",
        source: "Muslim",
        phase: "Madinah",
        category: "Dakwah",
        context: "Esensi agama Islam adalah saling menasihati",
        lesson: "Memberikan nasihat yang baik adalah bagian integral dari menjalankan agama",
        favorite: false,
    },
]

export const wisdomQuotes: WisdomQuote[] = [
    {
        id: 1,
        arabic: "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
        translation: "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya",
        phase: "Madinah",
        category: "Akhlak",
    },
    {
        id: 2,
        arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ",
        translation: "Senyummu di hadapan saudaramu adalah sedekah",
        phase: "Madinah",
        category: "Akhlak",
    },
    {
        id: 3,
        arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
        translation: "Menuntut ilmu adalah kewajiban bagi setiap muslim",
        phase: "Makkah",
        category: "Ilmu",
    },
]

export const audioRecitations: AudioRecitation[] = [
    {
        id: 1,
        title: "Surah Al-Alaq (Wahyu Pertama)",
        arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
        translation: "Bacalah dengan (menyebut) nama Tuhanmu yang menciptakan",
        phase: "Makkah",
        duration: "2:30",
        audioUrl: "/audio/al-alaq-1-5.mp3",
        description: "Surah pertama yang diturunkan kepada Rasulullah ﷺ di Gua Hira",
        cover: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Doa Perjalanan Hijrah",
        arabic: "رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ",
        translation:
            "Ya Tuhanku, masukkanlah aku ke tempat masuk yang benar dan keluarkanlah aku ke tempat keluar yang benar",
        phase: "Madinah",
        duration: "1:45",
        audioUrl: "/audio/doa-hijrah.mp3",
        description: "Doa yang dibaca Rasulullah saat melakukan Hijrah ke Madinah",
    },
    {
        id: 3,
        title: "Khutbah Haji Wada'",
        arabic: "يَا أَيُّهَا النَّاسُ اسْمَعُوا قَوْلِي",
        translation: "Wahai manusia, dengarkanlah perkataanku",
        phase: "Madinah",
        duration: "15:20",
        audioUrl: "/audio/khutbah-wada.mp3",
        description: "Khutbah terakhir Rasulullah ﷺ pada Haji Wada'",
    },
]

export const mapLocations: MapLocation[] = [
    // Rute Hijrah (Approximate coordinates)
    { id: 1, name: "Makkah (Gua Tsur)", description: "Titik awal persembunyian sebelum berangkat", coordinates: [21.3891, 39.8579], type: "route" },
    { id: 2, name: "Qudaid", description: "Perhentian di tenda Ummu Ma'bad", coordinates: [22.2167, 39.5833], type: "route" },
    { id: 3, name: "Madinah (Quba)", description: "Tiba di Quba dan membangun masjid pertama", coordinates: [24.4392, 39.6173], type: "route" },

    // Perang / Battles
    { id: 4, name: "Badr", description: "Lokasi Perang Badr (624 M)", coordinates: [23.7367, 38.7756], type: "battle", year: "624 M", result: "Kemenangan Muslim" },
    { id: 5, name: "Uhud", description: "Lokasi Perang Uhud (625 M)", coordinates: [24.4845, 39.6264], type: "battle", year: "625 M", result: "Kalah/Imbang" },
    { id: 6, name: "Khandaq", description: "Lokasi Perang Khandaq (Parit)", coordinates: [24.4750, 39.5900], type: "battle", year: "627 M", result: "Kemenangan Muslim" },

    // Places
    { id: 7, name: "Masjidil Haram", description: "Ka'bah dan pusat ibadah", coordinates: [21.4225, 39.8262], type: "place" },
    { id: 8, name: "Masjid Nabawi", description: "Masjid Nabi di Madinah", coordinates: [24.4672, 39.6108], type: "place" },
    { id: 9, name: "Gua Hira", description: "Tempat turunnya wahyu pertama", coordinates: [21.4578, 39.8579], type: "place" },
]
