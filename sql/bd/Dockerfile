FROM microsoft/mssql-server-linux:2017-CU1

ENV ACCEPT_EULA=Y \
    MSSQL_SA_PASSWORD=quintero1.

WORKDIR /init
COPY bd.* ./

RUN chmod +x ./bd.sh
RUN /opt/mssql/bin/sqlservr & ./bd.sh