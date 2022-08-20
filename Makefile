PORT = 8080
SERVER_CMD = python3 -m http.server

local-server:
	nohup $(SERVER_CMD) $(PORT) &

kill-server:
	kill `ps -u | grep -e "$(SERVER_CMD)" | awk '{print $$2}'` &> /dev/null
	rm nohup.out &> /dev/null
