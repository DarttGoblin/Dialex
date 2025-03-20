const user_input = document.querySelector('.user-input');

const dialect_samples = [
    "كيف داير؟",
    "إزيك؟",
    "بغيتي نشريو شي حاجة؟",
    "وينك؟ مشتقلك!",
    "شو الأخبار؟",
    "يلا بينا نخرج؟",
    "خلص، ما بدي أحكي!",
    "وين رايح؟",
    "شحال هادي؟",
    "في إيه يا عم؟",
    "شلونك حبيبي؟",
    "كل شي تمام؟",
    "يابه شكو ماكو؟",
    "تعال خل نطلع سوا",
    "شلونك؟",
    "غايتو الليلة الجو حار شديد",
    "والله حبابك ألف!",
    "كيفنّك؟",
];

GeneratePlaceHolders();

function GeneratePlaceHolders() {
    var dialect_samples_index = 1;
    SlowTyping(dialect_samples[0].split(""))
    setInterval(() => {
        var dialect_samples_letters = dialect_samples[dialect_samples_index].split("");
        user_input.placeholder = "";
        SlowTyping(dialect_samples_letters);
        dialect_samples_index == dialect_samples.length - 1 ? dialect_samples_index = 0 : dialect_samples_index++;
    }, 3000);
}

function SlowTyping(dialect_samples_letters) {
    for (var i = 0; i < dialect_samples_letters.length; i++) {
        (function(index) {
            setTimeout(() => { user_input.placeholder += dialect_samples_letters[index]; }, 50 * index);
        })(i);
    }
}