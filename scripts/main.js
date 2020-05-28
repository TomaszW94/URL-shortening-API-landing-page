//global variables
const $input_shorten = document.querySelector('#shorten-link');
const $btn_shortenit = document.querySelector('.btn-shortenit');
const $pWarning = document.querySelector('.warning');




//OPEN / CLOSE MENU
const btnMenu = document.querySelector('.menu-btn');
btnMenu.addEventListener('click', function () {
    const menu = document.querySelector('.menu-lists');
    menu.classList.toggle('active');
})

const createElements = (e) => {
    e.preventDefault();
    if ($input_shorten.value.toLowerCase().includes('http://') || $input_shorten.value.toLowerCase().includes('https://')) {

        //create element list ul
        const ulShortenlinks = document.createElement("ul");

        //where create this element
        const reference = document.querySelector('.shorten-it');
        reference.after(ulShortenlinks);
        ulShortenlinks.id = "shorten-links";
        ulShortenlinks.className = "shorten-links-list";

        //create element li inside ul
        const liShorten = document.createElement("li");
        ulShortenlinks.appendChild(liShorten);
        liShorten.className = "card-link";

        //create div inside li
        const divShortenBase = document.createElement("div");
        const divShortenLink = document.createElement("div");
        liShorten.appendChild(divShortenBase);
        liShorten.appendChild(divShortenLink);
        divShortenBase.className = "base-link";
        divShortenLink.className = "shorten-link";

        //create element p and button inside div
        const aBaselink = document.createElement("a");
        divShortenBase.appendChild(aBaselink);
        const aShortenlink = document.createElement("a");
        divShortenLink.appendChild(aShortenlink);
        aBaselink.setAttribute("href", $input_shorten.value.toLowerCase());
        aBaselink.innerText = $input_shorten.value.toLowerCase();
        aShortenlink.setAttribute("href", $input_shorten.value.toLowerCase());
        aShortenlink.innerText = $input_shorten.value.toLowerCase();
        aShortenlink.className = "new_link";
        const btn_shortlink = document.createElement("button");
        btn_shortlink.className = "btn_shortLink";
        divShortenLink.appendChild(btn_shortlink);
        btn_shortlink.innerText = "Copy";
        //delete warning message
        $pWarning.innerText = "";
        //Copy button
        btn_shortlink.addEventListener('click', copyToClipboard);
        //axios POST
        axiosPOST();
    }
}

//Axios function POST
const axiosPOST = () => {
    axios.post('https://rel.ink/api/links/', {
            "url": $input_shorten.value
        })
        .then(function (res) {
            document.querySelector('.new_link').innerText = `https://rel.ink/${res.data.hashid}`;
            $input_shorten.value = '';
            $input_shorten.classList.remove('invaild');
        })
        .catch(function (err) {
            console.log(err);
        })
};

//function copyToClipBoard
function copyToClipboard(e) {
    e.preventDefault();
    const btnCopy = e.target;
    const linkShortCopy = event.target.parentElement.querySelector('.new_link');
    const textArea = document.createElement("textarea");
    textArea.value = linkShortCopy.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    btnCopy.classList.add('clicked-btn');
    btnCopy.innerText = "Copied!";
}

$input_shorten.addEventListener('input', () => {
    if ($input_shorten.value.toLowerCase().includes('http://') || $input_shorten.value.toLowerCase().includes('https://')) {
        $pWarning.innerHTML = "";
        $btn_shortenit.addEventListener('click', createElements);
    } else {
        $pWarning.innerHTML = "Please add a link (http:// or https://)";
        $input_shorten.classList.add('invaild');
    }
});