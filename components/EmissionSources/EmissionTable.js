import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import Styles from './EmissionSources.module.css';

const createLink = link => {
  return <Link href={link}>Click here</Link>;
};

function createData(mode, emission_factor, references, details) {
  return { mode, emission_factor, references, details };
}

// some references
// for RAIL / SUBWAY
const ref_rail_sub =
  'Öko-Institut (Institut für angewandte Ökologie e.V.) 2009: Technologiedatenbasis für RENEWBILITY; Arbeitspapier zum BMU-geförderten Verbundvorhaben "Stoffstromanalyse nachhaltige Mobilitat im Kontext der erneuerbaren Energien bis 2030"; W.Zimmer/F.Hacker/M.Schmied unter Mitarbeit von IFEU; Darmstadt/Berlin';
const link_rail_sub =
  'https://www.probas.umweltbundesamt.de/php/prozessdetails.php?id=%7BF9C83447-3994-4B54-B7D7-A5E6B81C725E%7D';
// for BUS
const ref_bus =
  'Öko-Institut (Institut für angewandte Ökologie e.V.) 2009: Technologiedatenbasis für RENEWBILITY; Arbeitspapier zum BMU-geförderten Verbundvorhaben "Stoffstromanalyse nachhaltige Mobilitat im Kontext der erneuerbaren Energien bis 2030"; W.Zimmer/F.Hacker/M.Schmied unter Mitarbeit von IFEU; Darmstadt/Berlin';
const link_bus =
  'https://www.probas.umweltbundesamt.de/php/prozessdetails.php?id=%7BDF3D153D-827F-43D8-B60A-110ECD41B75B%7D';
// for CAR
const ref_car =
  'Öko-Institut (Institut für angewandte Ökologie e.V.) 2009: Technologiedatenbasis für RENEWBILITY; Arbeitspapier zum BMU-geförderten Verbundvorhaben "Stoffstromanalyse nachhaltige Mobilitat im Kontext der erneuerbaren Energien bis 2030"; W.Zimmer/F.Hacker/M.Schmied unter Mitarbeit von IFEU; Darmstadt/Berlin';
const link_car =
  'https://www.probas.umweltbundesamt.de/php/prozessdetails.php?id=%7B8E2799FC-CFD0-4070-96FF-5CC58CF0D5E2%7D';
// for BICYCLE
const ref_bicycle =
  'Öko-Institut (Institut für angewandte Ökologie e.V.) 1994: Umweltanalyse von Energie-, Transport- und Stoffsystemen: Gesamt-Emissions-Modell integrierter Systeme (GEMIS) Version 2.1 - erweiterter und aktualisierter Endbericht, U. Fritsche u.a., i.A. des Hessischen Ministeriums für Umwelt, Energie und Bundesangelegenheiten (HMUEB), veröffentlicht durch HMUEB, Wiesbaden 1995';
const link_bicycle =
  'https://www.probas.umweltbundesamt.de/php/prozessdetails.php?id=%7B0E0B2805-9043-11D3-B2C8-0080C8941B49%7D';
// for WALK
const ref_walk =
  'Öko-Institut (Institut für angewandte Ökologie e.V.) 1994: Umweltanalyse von Energie-, Transport- und Stoffsystemen: Gesamt-Emissions-Modell integrierter Systeme (GEMIS) Version 2.1 - erweiterter und aktualisierter Endbericht, U. Fritsche u.a., i.A. des Hessischen Ministeriums für Umwelt, Energie und Bundesangelegenheiten (HMUEB), veröffentlicht durch HMUEB, Wiesbaden 1995';
const link_walk =
  'https://www.probas.umweltbundesamt.de/php/prozessdetails.php?id=%7B0E0B2836-9043-11D3-B2C8-0080C8941B49%7D';

const rows = [
  createData('RAIL, SUBWAY', 0.0546, ref_rail_sub, createLink(link_rail_sub)),
  createData('BUS', 0.0434, ref_bus, createLink(link_bus)),
  createData('CAR', 0.144, ref_car, createLink(link_car)),
  createData('BICYCLE', 0.00408, ref_bicycle, createLink(link_bicycle)),
  createData('WALK', 0, ref_walk, createLink(link_walk)),
];

export default function EmissionTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={Styles.tablehead}>MODE</TableCell>
            <TableCell className={Styles.tablehead} align="right">
              CO{'\u2082'}e&nbsp;(kg/m)
            </TableCell>
            <TableCell className={Styles.tablehead} align="center">
              REFERENCE
            </TableCell>
            <TableCell className={Styles.tablehead} align="right">
              MORE DETAILS
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.mode}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.mode}
              </TableCell>
              <TableCell align="right">{row.emission_factor}</TableCell>
              <TableCell align="left">{row.references}</TableCell>
              <TableCell align="right">{row.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
