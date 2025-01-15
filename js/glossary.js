document.addEventListener('DOMContentLoaded', () => {

    const buttons = Array.from(document.getElementsByClassName('button'));
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            //Get specific entry from data
            let id = getIdFromEntry(event);
            const listItem = document.querySelector(`#${id}`)

            //Close this entry again when it was open and do nothing more
            const hiddenDiv = listItem.querySelector('div.hidden-information');
            if (hiddenDiv.innerText !== '') {
                hiddenDiv.innerText = '';
                return;
            }

            // close all entrys
            const hiddenDivs = Array.from(document.getElementsByClassName('hidden-information'));
            hiddenDivs.forEach(hiddenDiv => {
                hiddenDiv.innerText = '';
            })

            // open clicked entry
            hiddenDiv.appendChild(createEntry(id));
        })
    })
})

const getIdFromEntry = (event) => {

    //Get the Id of the glossary entry
    let id = Array.from(event.target.classList).filter(clazz => !clazz.includes('span')).at(0);

    // When id is 'general-information', the button was clicked on the div with the id 'general-information'
    // Then we have to use the id of the list entry (parent of div: button; parent of button: list entry)
    if (id === 'general-information') {
        id = event.target.parentElement.parentElement.id;
    }
    return id;
}

const createEntry = (id) => {

    let entry = data.filter(entry => entry.id === id)
    if (entry.length === 0) {
        return;
    } else {
        entry = entry[0];
    }

    const entryDiv = document.createElement('div');

    //first information like field, type, frequency and error
    const firstInfo = document.createElement('div');
    firstInfo.classList.add('first-info');

    const field = entry["Field"].toString()
    if (field !== "0" && field !== null) {
        const fieldDiv = document.createElement('div');
        fieldDiv.classList.add('field');
        fieldDiv.innerText = field.split(',').map(number => fieldMapping[parseInt(number)]).join(', ') + ";";
        firstInfo.appendChild(fieldDiv);
    }

    const type = entry["Field"].toString();
    if (type !== "0" && type !== null) {
        const typeDiv = document.createElement('div');
        typeDiv.classList.add('type');
        typeDiv.innerText = type.split(',').map(number => typeMapping[parseInt(number)]).join(', ') + ";";
        firstInfo.appendChild(typeDiv);
    }

    const frequency = entry["level&prev"].toString();
    if (frequency !== "0" && frequency !== null) {
        const frequencyDiv = document.createElement('div');
        frequencyDiv.classList.add('frequency');
        frequencyDiv.innerText = frequency.split(',').map(number => frequencyMapping[parseInt(number)]).join(', ') + ";";
        firstInfo.appendChild(frequencyDiv);
    }

    if (entry["Error"] === 'yes') {
        const error = document.createElement('div');
        error.classList.add('error');
        error.innerHTML = 'error';
        firstInfo.appendChild(error);
    }
    const flexDiv = document.createElement('div');
    flexDiv.classList.add('flex-div');

    //Left div
    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left');

    const divVarPinyin = document.createElement('div');
    const divVarHanzi = document.createElement('div');
    const divCfPinyin = document.createElement('div');
    const divCfHanzi = document.createElement('div');

    divVarPinyin.id = id + '-var-pinyin';
    divVarHanzi.id = id + '-var-hanzi';
    divCfPinyin.id = id + '-cf-pinyin';
    divCfHanzi.id = id + '-cf-hanzi';

    const varPinyin = entry['var Pinyin']
    const varHanzi = entry['var Hanzi']
    const cfPinyin = entry['cf pinyin']
    const cfHanzi = entry['cf Hanzi']

    if (varPinyin !== '0' && varPinyin !== null) {
        divVarPinyin.innerHTML = varPinyin;
        leftDiv.appendChild(divVarPinyin);
    }

    if (varHanzi !== '0' && varHanzi !== null) {
        divVarHanzi.innerHTML = varHanzi;
        leftDiv.appendChild(divVarHanzi);
    }

    if (cfPinyin !== '0' && cfPinyin !== null) {
        divCfPinyin.innerHTML = cfPinyin;
        leftDiv.appendChild(divCfPinyin);
    }

    if (cfHanzi !== '0' && cfHanzi !== null) {
        divCfHanzi.innerHTML = cfHanzi;
        leftDiv.appendChild(divCfHanzi);
    }

    //right div
    const rightDiv = document.createElement('div');
    rightDiv.classList.add('right');

    if (entry["Notes"] !== null) {
        const notes = document.createElement('div');
        notes.classList.add('notes')
        notes.innerText = entry.Notes;
        rightDiv.appendChild(notes);
    }

    //Definitions
    const memorial = entry["Memorial"];
    const tulue = entry["Tulue"];

    if ((memorial !== '0' && memorial !== null) || (tulue !== '0' && tulue !== null)) {
        const definitions = document.createElement('div');

        const definitionHeadline = document.createElement('h4');
        definitionHeadline.id = 'definitionHeadline';
        definitionHeadline.innerText = 'Definitions';

        const pMemorial = document.createElement('p');
        pMemorial.classList.add('definitions');
        pMemorial.innerText = `Memorial: ${memorial}`;

        const pTulue = document.createElement('p');
        pTulue.classList.add('definitions');
        pTulue.innerText = `Tulue: ${tulue}`;

        definitions.appendChild(definitionHeadline);
        definitions.appendChild(pMemorial);
        definitions.appendChild(pTulue);
        rightDiv.appendChild(definitions);
    }

    //Occurences
    if (anyOccurence(entry)) {

        const occurences = document.createElement('div');

        const occurenceHeadline = document.createElement('h4');
        occurenceHeadline.id = 'occurenceHeadline';
        occurenceHeadline.innerText = 'Occurences';
        occurences.appendChild(occurenceHeadline);

        //Wang Song
        if (entry["Wang Song B"] !== '0' && entry["Wang Song B"] !== null) {
            const pWangSong = document.createElement('a');
            pWangSong.href = 'otherTexts/Wang_Song.html';
            pWangSong.classList.add('occurences');
            if (entry["Wang Song "] !== '0' && entry["Wang Song "] !== null) {
                pWangSong.innerText = `Wang Song (${entry["Wang Song B"]}): ${entry["Wang Song "]}`;
            } else {
                pWangSong.innerText = `Wang Song (${entry["Wang Song B"]})`
            }
            occurences.appendChild(pWangSong);
        }

        //Ni Shenshu
        if (entry["Ni Shenshu B"] !== '0' && entry["Ni Shenshu B"] !== null) {
            const pNiShenshu = document.createElement('a');
            pNiShenshu.href = 'otherTexts/Caitongliantongji.html'
            pNiShenshu.classList.add('occurences');
            if (entry["Ni Shenshu "] !== '0' && entry["Ni Shenshu "] !== null) {
                pNiShenshu.innerText = `Ni Shenshu (${entry["Ni Shenshu B"]}): ${entry["Ni Shenshu "]}`
            } else {
                pNiShenshu.innerText = `Ni Shenshu (${entry["Ni Shenshu B"]})`
            }
            occurences.appendChild(pNiShenshu);
        }

        //Wu Zhenyu
        if (entry["Wu Zhenyu B"] !== '0' && entry["Wu Zhenyu B"] !== null) {
            const pWuZhenyu = document.createElement('a');
            pWuZhenyu.href = 'otherTexts/Changshusishou.html'
            pWuZhenyu.classList.add('occurences');
            if (entry["Wu Zhenyu "] !== '0' && entry["Wu Zhenyu "] !== null) {
                pWuZhenyu.innerText = `Wu Zhenyu (${entry["Wu Zhenyu B"]}): ${entry["Wu Zhenyu "]}`;
            } else {
                pWuZhenyu.innerText = `Wu Zhenyu (${entry["Wu Zhenyu B"]})`;
            }

            occurences.appendChild(pWuZhenyu);
        }

        //Tan Cui
        if (entry["Tan Cui B"] !== '0' && entry["Tan Cui B"] !== null) {
            const pTanCui = document.createElement('a');
            pTanCui.href = 'otherTexts/TanCui.html'
            pTanCui.classList.add('occurences');
            if (entry["Tan Cui "] !== '0' && entry["Tan Cui "] !== null) {
                pTanCui.innerText = `Tan Cui (${entry["Tan Cui B"]}): ${entry["Tan Cui "]}`;
            } else {
                pTanCui.innerText = `Tan Cui (${entry["Tan Cui B"]})`
            }
            occurences.appendChild(pTanCui);
        }

        //Sun Yi, Fukang'an
        if (entry["Sun Yi, Fukang'an B"] !== '0' && entry["Sun Yi, Fukang'an B"] !== null) {
            const pSunYi = document.createElement('a');
            pSunYi.href = 'otherTexts/SunandFukangan.html';
            pSunYi.classList.add('occurences');
            if (entry["Sun Yi, Fukang'an"] !== '0' && entry["Sun Yi, Fukang'an"] !== null) {
                pSunYi.innerText = `Sun Yi, Fukang'an (${entry["Sun Yi, Fukang'an B"]}): ${entry["Sun Yi, Fukang'an"]}`
            } else {
                pSunYi.innerText = `Sun Yi, Fukang'an (${entry["Sun Yi, Fukang'an B"]})`
            }
            occurences.appendChild(pSunYi);
        }

        //Quanshu
        if (entry["Quanshu B"] !== '0' && entry["Quanshu B"] !== null) {
            const pQuanshu = document.createElement('a');
            pQuanshu.href = 'otherTexts/Tongzhengquanshu.html';
            pQuanshu.classList.add('occurences');
            if (entry["Quanshu"] !== '0' && entry["Quanshu B"] !== null) {
                pQuanshu.innerText = `Quanshu (${entry["Quanshu B"]}): ${entry["Quanshu"]}`
            } else {
                pQuanshu.innerText = `Quanshu (${entry["Quanshu B"]})`
            }
            occurences.appendChild(pQuanshu);
        }

        //Wang Taiyue
        if (entry["Wang Taiyue B"] !== '0' && entry["Wang Taiyue B"] !== null) {
            const pWangTaiyue = document.createElement('a');
            pWangTaiyue.href = 'otherTexts/wang_taiyue.html';
            pWangTaiyue.classList.add('occurences');
            if (entry["Wang Taiyue"] !== '0' && entry["Wang Taiyue"] !== null) {
                pWangTaiyue.innerText = `Wang Taiyue (${entry["Wang Taiyue B"]}): ${entry["Wang Taiyue"]}`
            } else {
                pWangTaiyue.innerText = `Wang Taiyue (${entry["Wang Taiyue B"]})`
            }
            occurences.appendChild(pWangTaiyue);
        }

        //Gejiu
        if (entry["Gejiu B"] !== '0' && entry["Gejiu B"] !== null) {
            const pGejiu = document.createElement('a');
            pGejiu.href = 'otherTexts/gejiu.html';
            pGejiu.classList.add('occurences');
            if (entry["Gejiu"] !== '0' && entry["Gejiu B"] !== null) {
                pGejiu.innerText = `Gejiu (${entry["Gejiu B"]}): ${entry["Gejiu"]}`
            } else {
                pGejiu.innerText = `Gejiu (${entry["Gejiu B"]})`
            }
            occurences.appendChild(pGejiu);
        }

        //Chen Nieheng
        if (entry["Chen Nieheng B"] !== '0' && entry["Chen Nieheng B"] !== null) {
            const pChenNieheng = document.createElement('a');
            pChenNieheng.href = 'otherTexts/ChenNieheng.html';
            pChenNieheng.classList.add('occurences');
            if (entry["Chen Nieheng"] !== '0' && entry["Chen Nieheng"] !== null) {
                pChenNieheng.innerText = `Chen Nieheng (${entry["Chen Nieheng B"]}): ${entry["Chen Nieheng"]}`
            } else {
                pChenNieheng.innerText = `Chen Nieheng (${entry["Chen Nieheng B"]})`
            }
            occurences.appendChild(pChenNieheng);
        }

        //Song Yingxing
        if (entry["Song Yingxing B"] !== '0' && entry["Song Yingxing B"] !== null) {
            const pSongYingxing = document.createElement('a');
            pSongYingxing.href = 'otherTexts/song_yingxing.html';
            pSongYingxing.classList.add('occurences');
            if (entry["Song Yingxing "] !== '0' && entry["Song Yingxing "] !== null) {
                pSongYingxing.innerText = `Song Yingxing (${entry["Song Yingxing B"]}): ${entry["Song Yingxing "]}`
            } else {
                pSongYingxing.innerText = `Song Yingxing (${entry["Song Yingxing B"]})`
            }
            occurences.appendChild(pSongYingxing);
        }

        rightDiv.appendChild(occurences);

    }

    flexDiv.appendChild(leftDiv);
    flexDiv.appendChild(rightDiv);
    entryDiv.appendChild(firstInfo);
    entryDiv.appendChild(flexDiv);
    return entryDiv;
}

// Return true if there is at least one text occurence
const anyOccurence = (entry) => {
    return (entry["Wang Song B"] !== '0' && entry["Wang Song B"] !== null) ||
        (entry["Ni Shenshu B"] !== '0' && entry["Wang Song B"] !== null) ||
        (entry["Wu Zhenyu B"] !== '0' && entry["Wang Song B"] !== null) ||
        (entry["Tan Cui B"] !== '0' && entry["Wang Song B"] !== null) ||
        (entry["Sun Yi, Fukang'an B"] !== '0' && entry["Wang Song B"] !== null) ||
        (entry["Quanshu B"] !== '0' && entry["Wang Song B"] !== null) ||
        (entry["Wang Taiyue B"] !== '0' && entry["Wang Song B"] !== null) ||
        (entry["Gejiu B"] !== '0' && entry["Wang Song B"] !== null) ||
        (entry["Chen Nieheng B"] !== '0' && entry["Wang Song B"] !== null) ||
        (entry["Song Yingxing B"] !== '0' && entry["Wang Song B"] !== null);

}

// Mapping of the field options
const fieldMapping = {
    1: "Trade term, mining",
    2: "Trade term, smelting",
    3: "Communal structure",
    4: "Administrative: taxation",
    5: "Administrative: control"
};

// Mapping of the type options
const typeMapping = {
    1: "spoken lang.",
    2: "regional",
    3: "literay",
    4: "proverbial",
};

// Mapping of the frequency options
const frequencyMapping = {
    1: "common",
    2: "rare",
    3: "very rare",
};