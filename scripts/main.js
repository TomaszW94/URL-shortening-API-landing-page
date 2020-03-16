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


// CREATE ELEMENTS UL/LI/BUTTON shortin-link

const createElements = () => {
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
        aShortenlink.id = "new_link";
        const btn_shortlink = document.createElement("button");
        btn_shortlink.className = "btn_shortLink";
        divShortenLink.appendChild(btn_shortlink);
        btn_shortlink.innerText = "Copy";
        //delete warning message
        $pWarning.innerText = "";

        //function copyToClipBoard
        function copyToClipboard() {

            new ClipboardJS('.btn_shortLink', {
                text: function (e) {
                    let select_element = document.querySelector('#new_link');
                    return select_element.innerHTML;
                }
            });

            btn_shortlink.classList.add('clicked-btn');
            btn_shortlink.innerText = "Copied!";
        }

        //Copy button
        btn_shortlink.addEventListener('click', copyToClipboard);


        //Axios method POST
        axios.post('https://rel.ink/api/links/', {
                "url": $input_shorten.value
            })
            .then(function (res) {
                aShortenlink.innerText = `https://rel.ink/${res.data.hashid}`;
                $input_shorten.value = '';
                $input_shorten.classList.remove('invaild');
            })
            .catch(function (err) {
                console.log(err);
            });

    } else {
        $pWarning.innerHTML = "Please add a link (http:// or https://)";
        $input_shorten.classList.add('invaild');
    }
}


$btn_shortenit.addEventListener('click', createElements);