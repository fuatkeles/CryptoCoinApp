const apiKey = 'coinranking09f3a40be57c09c8ce07a51cfc58d773093438cfe7304bce';
const limit = 50
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const coinResultsElement = document.querySelector(".ajax-section");
const coinList = document.getElementById('coin-list');
const mesaj = document.getElementById('mesaj');

searchForm.addEventListener('submit', searchCoin);

let listedCoins = [];


async function searchCoin(event) {
  event.preventDefault(); // Formun otomatik olarak submit olmasını engeller

  const coinName = searchInput.value.trim();

  if (listedCoins.includes(coinName.toLowerCase())) {
    mesaj.innerHTML = `Bu coin zaten listelenmiş.`
    return;
  }
    //coinResultsElement.innerHTML = '<p>Lütfen bir arama metni girin.</p>';
    
 

  try {
    const response = await fetch(`https://api.coinranking.com/v2/coins?access_token=${apiKey}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('İstek başarısız. Hata kodu:', response.status);
    }
    const data = await response.json();
    console.log(data);

    //coinResultsElement.innerHTML = ''; // Önceki sonuçları temizle

    // const matchingCoins = data.data.coins.filter(coin => coin.name.toLowerCase().includes(coinName.toLowerCase()));
    const matchingCoins = data.data.coins.filter(coin => coin.name.toLowerCase() === coinName.toLowerCase());
    if (matchingCoins.length > 0 ) {
      // matchingCoins.forEach(coin => {
      //   coinResultsElement.innerHTML += `<figure class="coin-figure"> 
      //   <img src="${coin.iconUrl}" alt="${coin.name} Logo" class="coin-figure-img">
      //   <figcaption class="coin-figure-caption">
      //         <h3 class="coin-figure-name">${coin.name}</h3>
      //         <p class="coin-figure-symbol">${coin.symbol}</p>
      //         <p class="coin-figure-rank">${coin.rank}</p>
      //         <p class="coin-figure-price">$${coin.price}</p>
      //         <p class="coin-figure-market-cap">$${coin.marketCap}</p>
      //       </figcaption>
      //     </figure>`;
      // });
      matchingCoins.forEach(coin => {
        const figureElement = document.createElement("figure");
        figureElement.className = "coin-figure";
      
        figureElement.innerHTML = `
          
          <figcaption class="coin-figure-caption">
          <div class="coin-name-symbol">
          <p class="coin-figure-name">${coin.name}</p>
            <p class="coin-figure-symbol">${coin.symbol}</p>      
            
          </div>
          <p class="coin-figure-price">$${coin.price.substring(0,10)}</p>
          <img src="${coin.iconUrl}" alt="${coin.name} Logo" class="coin-figure-img">
            <div>
               ${
                  coin.change > 0 ? 
                  `<p class="coin-figure-change" style="color:green">${coin.change} %</p>` 
                    :
                  `<p class="coin-figure-change" style="color:red">${coin.change} %</p>`
                }
              </div>
            
          </figcaption>
        `;
        coinResultsElement.prepend(figureElement);
        listedCoins.push(coinName.toLowerCase());
        mesaj.innerHTML = ``;
        //!En son arananın en başa çıkmasını sağlayan bölüm        
        
      });
    } else {
      mesaj.innerHTML = '<p>Sonuç bulunamadı.</p>';
    }
  } catch (error) {
    console.error(error);
    mesaj.innerHTML = '<p>Arama sırasında bir hata oluştu.</p>';
  }
}


