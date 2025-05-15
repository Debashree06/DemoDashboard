import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  TextField,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import parse from "date-fns/parse";

const LeadsTable = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchAllText, setSearchAllText] = useState("");
  const [searchPostcodeText, setSearchPostcodeText] = useState("");
  const [status, setStatus] = useState("");
  const [subscription, setSubscription] = useState("");
  const [leadType, setLeadType] = useState("");
  const [broker, setBroker] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/leads');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          setError(new Error("Frontend: Expected an array of leads, but received something else. Check your backend!"));
          setLoading(false);
          return;
        }
        const adaptedData = data.map((item, index) => ({
          ...item,
          id: index + 1, 
        }));
        setLeads(adaptedData);
      } catch (error) {
        setError(error);
        console.error("Frontend: Failed to fetch leads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    if (!leads) return [];
    return leads.filter((row) => {
      const matchAllSearch = searchAllText
        ? Object.values(row).join(" ").toLowerCase().includes(searchAllText.toLowerCase())
        : true;
      const matchPostcodeSearch = searchPostcodeText
        ? (row.postcode || "").toLowerCase().includes(searchPostcodeText.toLowerCase())
        : true;
      const matchStatus = status ? row.status === status : true;
      const matchSubscription = subscription ? row.subscription === subscription : true;
      const matchType = leadType ? row.leadObjectType === leadType : true;
      const matchBroker = broker ? row.broker?.toLowerCase() === broker.toLowerCase() : true;
      const rowDate = row.date ? parse(row.date, "dd.MM.yyyy", new Date()) : null;
      const matchFrom = fromDate && rowDate ? rowDate >= fromDate : true;
      const matchTo = toDate && rowDate ? rowDate <= toDate : true;

      return (
        matchAllSearch &&
        matchPostcodeSearch &&
        matchStatus &&
        matchSubscription &&
        matchType &&
        matchBroker &&
        matchFrom &&
        matchTo
      );
    });
  }, [
    searchAllText,
    searchPostcodeText,
    status,
    subscription,
    leadType,
    broker,
    fromDate,
    toDate,
    leads,
  ]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "date", headerName: "Date", width: 100 },
      { field: "leadId", headerName: "Lead ID", width: 120 },
      {
        field: "objectId",
        headerName: "Object ID",
        width: 130,
        renderCell: (params) => (
          <span style={{ color: "blue", cursor: "pointer" }}>{params.value}</span>
        ),
      },
      { field: "leadObjectType", headerName: "Type", width: 100 },
      { field: "company", headerName: "Company", width: 120 },
      {
        field: "name",
        headerName: "Name",
        width: 200,

      },
      {
        field: "phone",
        headerName: "Phone",
        width: 200,

      },
      { field: "act", headerName: "Act", width: 80 },
      { field: "status", headerName: "Status", width: 120 },
      { field: "subscription", headerName: "Subscription", width: 130 },
      { field: "broker", headerName: "Broker", width: 100 },
    ],
    []
  );

  if (loading) {
    return <Box p={2}>Loading leads data...</Box>;
  }

  if (error) {
    return <Box p={2}>Error: {error.message}</Box>;
  }

  return (
    <Box p={2}>
      {/* Search and Date Filters */}
      <Stack spacing={2} direction="row" flexWrap="wrap" mb={2}>
        <TextField
          label="Search by customer number, lead ID, property ID, agent, nam"
          size="small"
          value={searchAllText}
          onChange={(e) => setSearchAllText(e.target.value)}
        />
        <TextField
          label="Search by postcode"
          size="small"
          value={searchPostcodeText}
          onChange={(e) => setSearchPostcodeText(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="From"
            value={fromDate}
            onChange={setFromDate}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
          <DatePicker
            label="Until"
            value={toDate}
            onChange={setToDate}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
      </Stack>

      {/* Filter Buttons */}
      <Stack spacing={2} direction="column" mb={2}>
        <Stack spacing={2} direction="row" alignItems="center" flexWrap="wrap">
          <Typography>Status:</Typography>
          <ToggleButtonGroup
            value={status}
            exclusive
            onChange={(e, val) => setStatus(val || "")}
            size="small"
          >
            {[
              "new",
              "no feedback",
              "in progress",
              "waiting",
              "no success",
              "order placed",
              "completed",
            ].map((s) => (
              <ToggleButton key={s} value={s}>
                {s}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Typography sx={{ ml: 2 }}>Subscription:</Typography>
          <ToggleButtonGroup
            value={subscription}
            exclusive
            onChange={(e, val) => setSubscription(val || "")}
            size="small"
          >
            {["prepaid", "premium"].map((s) => (
              <ToggleButton key={s} value={s}>
                {s}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>

        <Stack spacing={2} direction="row" alignItems="center" flexWrap="wrap">
          <Typography>Lead object type:</Typography>
          <ToggleButtonGroup
            value={leadType}
            exclusive
            onChange={(e, val) => setLeadType(val || "")}
            size="small"
          >
            {["Salesperson", "Buyer"].map((s) => (
              <ToggleButton key={s} value={s}>
                {s}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Typography sx={{ ml: 2 }}>Broker:</Typography>
          <ToggleButtonGroup
            value={broker}
            exclusive
            onChange={(e, val) => setBroker(val || "")}
            size="small"
          >
            <ToggleButton value="prime">Prime</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>

      {/* Data Table */}
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          key={filteredLeads.length}
          rows={filteredLeads}
          columns={columns}
         
          pageSizeOptions={[7, 10, 20]}
          getRowId={(row) => row.id}
          components={{
            Toolbar: GridToolbar, 
          }}
        />
      </Box>
    </Box>
  );
};

export default LeadsTable;