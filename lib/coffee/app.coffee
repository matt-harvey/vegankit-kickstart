KS           = require '../../lib-core/coffee/app'
videoLoader  = require './videoLoader'
anchorMenu   = require './anchorMenu'
navbarToggle = require './navbarToggle'
smoothTOCer  = require './smoothTOCer'
getLang      = require './localeDetect'
killCounter  = require '../js/killCounter'

document.addEventListener 'DOMContentLoaded', ->
  videoLoader()
  anchorMenu()
  killCounter()
  navbarToggle()
  smoothTOCer(k$.$('#toc'), k$.$('.page-content'))

  # locale redirect
  k$.locale = getLang().substr(0, 2)
  k$.redirect_locale = (page) ->
    # Old website not working :(
    # if k$.locale == "pt" or k$.locale == "sv" or k$.locale == "ro" or k$.locale == "es"
    #   location.href = "http://legacy.vegankit.com/#{page}"
