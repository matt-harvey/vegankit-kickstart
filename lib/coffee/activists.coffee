activists = ->
  activist = ""

  QueryString = ->
    query_string = {}
    query = window.location.search.substring(1)
    vars = query.split("&")
    `for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
          // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = decodeURIComponent(pair[1]);
          // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
        query_string[pair[0]] = arr;
          // If third or later entry with this name
      } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }`
    query_string

  writeScore = (database, ip) ->
    referralKey = database.ref('activists/' + activist).child('referrals').push().key
    updates = {}
    updates['/referrals/' + referralKey] = ip
    console.debug("updating...")
    database.ref('activists/' + activist).update(updates)

  setScore = (ip) ->
    console.debug("Checking for existing data")
    alreadyRecorded = false
    return console.error "Could not retrieve IP" if !ip
    console.debug("connecting...")
    database = firebase.database()

    database.ref('activists/' + activist + '/referrals').on 'value', (snapshot) ->
      console.debug("retrieved data...")
      records = snapshot.val()
      for index, savedIp of records
        alreadyRecorded = true if savedIp == ip
      if alreadyRecorded
        console.debug("Referral already recorded")
      else
        console.debug("writing...")
        writeScore database, ip

  getIP = (onNewIP) ->
    ipIterate = (ip) ->
      if !localIPs[ip]
        onNewIP ip
      localIPs[ip] = true
      return

    console.log 'getting ip'
    myPeerConnection = window.RTCPeerConnection or window.mozRTCPeerConnection or window.webkitRTCPeerConnection
    #compatibility for firefox and chrome
    pc = new myPeerConnection(iceServers: [])

    noop = ->

    localIPs = {}
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g
    key = undefined
    pc.createDataChannel ''
    #create a bogus data channel
    pc.createOffer ((sdp) ->
      sdp.sdp.split('\n').forEach (line) ->
        if line.indexOf('candidate') < 0
          return
        line.match(ipRegex).forEach ipIterate
        return
      pc.setLocalDescription sdp, noop, noop
      return
    ), noop
    # create offer and set local description

    pc.onicecandidate = (ice) ->
      #listen for candidate events
      if !ice or !ice.candidate or !ice.candidate.candidate or !ice.candidate.candidate.match(ipRegex)
        return
      ice.candidate.candidate.match(ipRegex).forEach ipIterate
      return

    return

  if activist = QueryString().activist_username
    console.debug("Found activist referrer: " + activist)
    getIP setScore

module.exports = activists
