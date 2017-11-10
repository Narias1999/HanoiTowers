let control
let jugadas = 0
let minutos = 0, segundos = 0
$(function () {
  $('#resume').click(function(){
    $('#pauseFace').css({
      'z-index':0,
      'opacity':0
    })
    setTimeout(function(){
      cronometro()
    },300)
  })
  $('#pause').click(function(){
    pause()
  })
  for (let i = 1; i <= 8; i++) {
    $(`#drag${i}`).data('data',{
      value: i,
      lastTower: $('#tower1')
    })
  }
  $('.aro').draggable({
    disabled: true, 
    revert: true,
    stop: function(){
      jugadas++
      $('#jugadas').html(jugadas)
    }
  })
  let level
  $('#easy').click(function(){
    $('a').removeClass('active')
    $(this).addClass('active')
    level = 1
  })
  $('#medium').click(function(){
    $('a').removeClass('active')
    $(this).addClass('active')
    level = 2
  })
  $('#hard').click(function(){
    $('a').removeClass('active')
    $(this).addClass('active')
    level = 3
  })

  $('#start').click(function(){
    if (!$('#username').val()) {
      alert('Por favor ingrese un nombre de usuario valido')
      return
    }
    let lv
    if (level==1) {
      $('#tower1').data('data',{
        pos: 'left',
        maxValue: 3,
        elements: [$('#drag1'),$('#drag2'),$('#drag3')]
      })
      $('#drag4').css('display','none')
      $('#drag5').css('display','none')
      $('#drag6').css('display','none')
      $('#drag7').css('display','none')
      $('#drag8').css('display','none')
      lv = 'easy'
    }else if(level==2){
      $('#tower1').data('data',{
        pos: 'left',
        maxValue: 5,
        elements: [$('#drag1'),$('#drag2'),$('#drag3'),$('#drag4'),$('#drag5')]
      })
      $('#drag6').css('display','none')
      $('#drag7').css('display','none')
      $('#drag8').css('display','none')
      lv = 'medium'
    }else if(level == 3){
      $('#tower1').data('data',{
        pos: 'left',
        maxValue: 8,
        elements: [$('#drag1'),$('#drag2'),$('#drag3'),$('#drag4'),$('#drag5'),$('#drag6'),$('#drag7'),$('#drag8')]
      })
      lv = 'hard'
    }else{
      alert('Por favor, primero seleccione un nivel')
      return
    }
    startGame(lv)
  })
})

function validarVictoria(level,jugadas){
  let aros
  if (level == 'easy') aros = 3
  else if(level == 'medium') aros = 5
  else aros = 8
  const elementsT2 = $('#tower2').data('data').elements.length
  const elementsT3 = $('#tower3').data('data').elements.length
  if (elementsT2 == aros || elementsT3 == aros) {
    clearInterval(control)
    $('.aro').draggable({disabled: true})
    setTimeout(function(){
      win(jugadas, level)
    }, 800)
  }
}
function win(jugadas, level){
  $('#game').css('transform', 'scale(0)')
  $('#moves').html(jugadas)
  if (minutos < 10) minutos = `0${minutos}`
  if (segundos < 10) segundos = `0${segundos}`
  $('#time').html(`${minutos}:${segundos} m`)
  setTimeout(function(){
    $('#winFace').css('transform', 'scale(1)')
  }, 400)
  if (level == 'easy') level = "facil"
  else if(level == 'medium') level = "medio"
  else level = "dificil"
  let seconds = 5
  let username = $('#username').val()
  setInterval(function(){
    if (!seconds){
      location.href = `php/resultados.php?user=${username}&minutos=${minutos}&segundos=${segundos}&jugadas=${jugadas}&nivel=${level}`
    }
    $('#seconds').html(seconds)
    seconds--
  },1000)
}
function startGame(level){
  $('#user').html($('#username').val())
  $('#jugadas').html(jugadas)
  $('#mainFace').css({
    transform: 'scale(0)',
    'border-radius':'50%'
  })
  setTimeout(function(){
    $('#game').css({
      transform: 'scale(1)',
      'border-radius': 0
    })
  },400)
  setTimeout(function(){
    cronometro()
  },800) 
  $('#tower2').data('data',{
    pos: 'center',
    maxValue: 0,
    elements: []
  })
  $('#tower3').data('data',{
    pos: 'right',
    maxValue: 0,
    elements: []
  })

  let elements = $('#tower1').data('data').elements
  elements[elements.length-1].draggable({disabled:false})
  $( ".tower" ).droppable({
    drop: function( event, ui ) {
      let maxValue = $(this).data("data").maxValue
      let dragValue = ui.draggable.data("data").value
      
      if (dragValue > maxValue) {
        ui.draggable.draggable({revert: false})
        setTimeout(function(){
          ui.draggable.draggable({revert: true})
        },400)
        let estado = false
        $(this).data('data').elements.forEach(function(el){
          if (el[0] == ui.draggable[0]) estado = true
        })
        if (!estado) $(this).data("data").elements.push(ui.draggable)

        let lastTower = ui.draggable.data('data').lastTower
        let elements = lastTower.data('data').elements
        if (lastTower[0] != $(this)[0]){
          elements.pop()
        } 
        
        if (elements.length > 0){
          elements[elements.length-1].draggable({disabled:false})
          lastTower.data('data').maxValue = elements[elements.length-1].data('data').value
        }else lastTower.data('data').maxValue = 0
        ui.draggable.data('data').lastTower = $(this)
        elements = $(this).data('data').elements
        if (elements.length>1) {
          elements.forEach(el => el.draggable({disabled:true}))
        }
        elements[elements.length-1].draggable({disabled:false})
        $(this).data("data").maxValue = dragValue
      }

      let top =  $(this).data("data").elements.length * 20
      top = `calc(100% - ${top}px)`
      let left
      let position = $(this).data('data').pos
      if (position == 'center') {
        left = 30 + dragValue
        left = `${left}vw`
      }else if (position == 'left') {
        left = 3 + dragValue
        left = `${left}vw`
      }else{
        left = 56.7 + dragValue
        left = `${left}vw`
      }
      ui.draggable.css({
        left,
        top,
        transition: ".4s"
      })
      setTimeout(function(){
        ui.draggable.css({transition: "0s"})
        validarVictoria(level, jugadas)
      }, 400)
    }
  })
}

function cronometro(){
  segundos++
  if (segundos == 60) {
    minutos++
    segundos = 0
  }
  let txtS = (segundos<10) ? `0${segundos}` : `${segundos}`
  let txtM = (minutos<10) ? `0${minutos}` : `${minutos}`
  $('#segundos').html(txtS)
  $('#minutos').html(txtM)
  control = setTimeout(function(){ cronometro() }, 1000);
}

function pause(){
  clearTimeout(control)
  $('#pauseFace').css({
    'z-index':1000,
    'opacity':1
  })
}