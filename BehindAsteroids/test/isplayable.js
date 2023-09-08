describe('Affichage', function() {
    it('Can I start game', function(client) {
        client.url("http://127.0.0.1:8080/")
     client
        .waitForElementVisible('#c', 5000)
        .pause(3000)
        for(i = 0; i< 5;i++){
          client.click('#u')

        }
        client.pause(2000)
        for(i = 0; i< 10;i++){
          client.click('#u')

        }
        // .moveTo('#u', 150, 150)
        // .mouseButtonClick(0)
        client.click('#u')
        .pause(2000)
        .click('#u')
        .pause(2000)
        .click('#u')
      console.log("game Started");
    });

    it('Can I play', function(client) {
      client.waitForElementVisible("#key", 5000)
      // client.pause(4000)  
      let lettre = "";
      let templettre = "";
      let n = 0;

      for(let i=0; i<4; i++){
        client.getText("#key", (e)=>{
          client.sendKeys("body", e.value)
          console.log("Lettre asteroidé", e.value)
          // client.sendKeys('body', e.value)

          templettre = e.value;
          if(lettre != templettre){
            n++;
          }

          for(let j = 0; j < 15; j++){
            client.sendKeys('body', e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value+e.value)
          }

          lettre = templettre;
          console.log("Nombres de lettres testé =>", n);
          console.log("Nombres d'asteroides envoyés =>", n);
          if(i === 4){
            client.assert.ok(n >= 2)
          }
          // else if (i === 4 && n < 2){
          //   client.assert.ok(n === "Le plan a échoué")
  
          // }
        client.pause(500)
        })
      }
      
    })
})