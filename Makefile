PYTHON = $(PWD)/venv/bin/python
PORT = 8080
SERVER_CMD = $(PYTHON) -m http.server

test:
	echo $(PYTHON)
	echo $(SERVER_CMD)

local-server:
	nohup $(SERVER_CMD) $(PORT) &

kill-server:
	kill `ps -u | grep -e "$(SERVER_CMD)" | awk '{print $$2}'` &> /dev/null
	rm -f nohup.out &> /dev/null
