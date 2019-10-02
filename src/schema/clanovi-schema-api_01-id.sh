curl -X POST -H 'Content-type:application/json' --data-binary '{
  "add-field":{
"name":"id"
,"type":"string"
,"multiValued":false
,"indexed":true
,"required":true
,"stored":true}
}' http://localhost:8983/solr/sd/schema
