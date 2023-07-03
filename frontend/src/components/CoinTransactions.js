import * as React from 'react'
import Title from './utils/Title';
import {
    Typography,
    Link,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Table,
    Paper,
    Box,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Zoom,
    IconButton,
    Tooltip
} from '@mui/material';
import { getDisplayableTxHash, getStatusName } from './utils/Display';
import {
    getCoinDecimalsPlace,
    getCoinFee,
    getCoinLogo,
    getNetworkExplorerBase,
    getNetworkName
} from './utils/Chains';
import CopyToClipboard from 'react-copy-to-clipboard';
import CopyIcon from "../assets/receiveCopyIcon.svg";
import LinkIcon from "../assets/linkIcon.svg";
import getTransaction from '../hooks/getTransaction';


export default function CoinTransactions({ transactions, coin, chainId }) {
    var interval;
    const [copied, setCopied] = React.useState(false);
    const [txCopied, setTxCopied] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false)
    const [selectedTransaction, setSelectedTransaction] = React.useState(undefined)

    const handleClose = () => {
        if (interval) {
            clearInterval(interval)
        }
        setOpenDialog(false)
        setSelectedTransaction(undefined)
    }

    const monitorTransaction = (transaction) => {
        if (interval) {
            clearInterval(interval)
        }

        interval = setInterval(async function () {
            const _transaction = await getTransaction(transaction.transactionId)
            setSelectedTransaction(_transaction)
            if (_transaction.status === 3)
                clearInterval(interval)
        }, 5000)
    }

    const handleOpen = async (transaction, e) => {
        if (e)
            e.preventDefault()
        setSelectedTransaction(transaction)
        setOpenDialog(true)
        monitorTransaction(transaction)
    }

    const getRealDate = (date) => {
        return date?.replace('T', ' ').replace('Z', '').replace(/\.\d+/, "")
    }

    return (
        <>
            <Paper
                sx={{
                    p: 2
                }}>
                <React.Fragment>
                    <Title>transaction history</Title>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Transaction ID</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>state</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow style={{ cursor: 'pointer' }} key={transaction.txHash} onClick={() => handleOpen(transaction)}>
                                    <TableCell>
                                        <Link onClick={(e) => handleOpen(transaction, e)} underline='none' target='_blank'>
                                            {getDisplayableTxHash(transaction.txHash)}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            component="span"
                                            color={transaction.nature === 1 ? 'green' : 'red'}>
                                            {transaction.nature === 1
                                                && transaction.status > 1 ? '+' : ''}
                                            {transaction.amount ? parseFloat(transaction.amount).toFixed(getCoinDecimalsPlace(coin)) : ''}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            transaction.status === 1 ?
                                                <Alert severity="warning" icon={false}>  {getStatusName(transaction.status)}</Alert> :
                                                transaction.status === 2 ?
                                                    <Alert severity="info" icon={false}>
                                                        {transaction.confirmations > 0 ? `Confirmación ${transaction.confirmations}/12` : getStatusName(transaction.status)}
                                                    </Alert> :
                                                    transaction.status === 3 ?
                                                        <Alert severity="success" icon={false}>  {getStatusName(transaction.status)}</Alert> :
                                                        transaction.status === 4 ?
                                                            <Alert severity="error" icon={false}>  {getStatusName(transaction.status)}</Alert> :
                                                            getStatusName(transaction.status)
                                        }
                                    </TableCell>
                                    <TableCell>{getRealDate(transaction.created_at)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box margin={3}></Box>
                </React.Fragment>
            </Paper>
            <Dialog
                fullWidth
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Detalles de ${selectedTransaction
                        ? selectedTransaction.nature === 1 ? 'Deposit' : 'Withdrawal' : 'Transaction'}`}
                </DialogTitle>
                <DialogContent>
                    {
                        selectedTransaction ?
                            <Box>
                                <Box mb={2}>
                                    <Grid container columns={6}>
                                        <Grid item xs={1}>

                                            <Typography variant="body2" color="text.secondary" mb={1}>
                                            state
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}></Grid>
                                        <Grid item xs={2}>

                                            <Typography variant="body2"
                                                color={selectedTransaction.status === 1 ? '#ffc107'
                                                    : selectedTransaction.status === 2 ? '#17a2b8'
                                                        : selectedTransaction.status === 3 ? 'rgb(14, 203, 129)'
                                                            : selectedTransaction.status === 4 ? '#dc3545' : 'black'}
                                            >
                                                <span style={{ fontSize: '1.2rem' }}>●</span>

                                                {selectedTransaction.status === 2 ? selectedTransaction.confirmations > 0 ? `Confirmation ${selectedTransaction.confirmations}/12` : getStatusName(selectedTransaction.status)
                                                    : getStatusName(selectedTransaction.status)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box mb={2}>
                                    <Grid container columns={6}>
                                        <Grid item xs={1}>
                                            <Typography variant="body2" color="text.secondary" mb={1}>
                                            Date
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}></Grid>
                                        <Grid item xs={2}>

                                            <Typography variant="body2"
                                                color='black'>
                                                {getRealDate(selectedTransaction.created_at)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box mb={2}>
                                    <Grid container columns={6}>
                                        <Grid item xs={1}>
                                            <Typography variant="body2" color="text.secondary" mb={1}>
                                                your wallet
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}></Grid>
                                        <Grid item xs={2}>
                                            <Grid container columns={3}>
                                                <Grid item xs={1}>
                                                    <img width={20} src={getCoinLogo(coin)} />
                                                </Grid>
                                                <Grid item xs={2} marginLeft={-4}>
                                                    <Typography variant="body2"
                                                        color='black' alignItems='center' marginTop={'2%'}>
                                                        {coin.toUpperCase()}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box mb={2}>
                                    <Grid container columns={6}>
                                        <Grid item xs={2}>
                                            <Typography variant="body2" color="text.secondary" mb={1}>
                                                {
                                                    `Amount of${selectedTransaction
                                                        ? selectedTransaction.nature === 1 ? 'l Deposit' : 'l Withdrawal' : 'Transaction'}`
                                                }
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={2}>

                                            <Typography variant="body2"
                                                color='black'>
                                                {selectedTransaction.nature === 1 ? parseFloat(selectedTransaction.amount).toFixed(getCoinDecimalsPlace(coin))
                                                    : -1 * parseFloat(Math.abs(selectedTransaction.amount) - getCoinFee(coin)).toFixed(getCoinDecimalsPlace(coin))}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box mb={2}>
                                    <Grid container columns={6}>
                                        <Grid item xs={1}>
                                            <Typography variant="body2" color="text.secondary" mb={1}>
                                                Red
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}></Grid>
                                        <Grid item xs={2}>

                                            <Typography variant="body2"
                                                color='black'>
                                                {getNetworkName(chainId)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                {selectedTransaction.nature === 2 ?
                                    <>
                                        <Box mb={2}>
                                            <Grid container columns={6}>
                                                <Grid item xs={2}>
                                                    <Typography variant="body2" color="text.secondary" mb={1}>
                                                    network commission
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}></Grid>
                                                <Grid item xs={2}>
                                                    <Typography variant="body2"
                                                        color='black'>
                                                        {getCoinFee(coin)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box mb={2}>
                                            <Grid container columns={6}>
                                                <Grid item xs={1}>
                                                    <Typography variant="body2" color="text.secondary" mb={1}>
                                                    Address
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={5}>

                                                    <Typography variant="body2"
                                                        color='black'>
                                                        {selectedTransaction.to}
                                                        <Link color='inherit' underline='none' target='_blank' href={`${getNetworkExplorerBase(chainId).replace('tx', 'address')}${selectedTransaction.to}`}>
                                                            <IconButton>
                                                                <img
                                                                    src={LinkIcon}
                                                                    alt="Open"
                                                                    style={{ width: "100%", height: "100%" }}
                                                                />
                                                            </IconButton>
                                                        </Link>

                                                        <CopyToClipboard
                                                            text={selectedTransaction.to}
                                                            onCopy={() => setCopied(true)}
                                                        >
                                                            <Tooltip
                                                                title={
                                                                    copied ? (
                                                                        <Typography variant="caption" color="text.success">
                                                                            Dirección copiada!
                                                                        </Typography>
                                                                    ) : (
                                                                        "Copy"
                                                                    )
                                                                }
                                                                TransitionComponent={Zoom}
                                                            >
                                                                <IconButton>
                                                                    <img
                                                                        src={CopyIcon}
                                                                        alt="Copy"
                                                                        style={{ width: "100%", height: "100%" }}
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </CopyToClipboard>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </>
                                    : <></>}
                                {
                                    selectedTransaction.status > 1 ?
                                        <Box>
                                            <Grid container columns={6}>
                                                <Grid item xs={1}>
                                                    <Typography variant="body2" color="text.secondary" mb={1}>
                                                        TxID
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={5}>

                                                    <Typography variant="body2"
                                                        color='black'>
                                                        {`${selectedTransaction.txHash.slice(0, selectedTransaction.txHash.length - 18)}...`}
                                                        <Link color='inherit' underline='none' target='_blank' href={`${getNetworkExplorerBase(chainId)}${selectedTransaction.txHash}`}>
                                                            <IconButton>
                                                                <img
                                                                    src={LinkIcon}
                                                                    alt="Open"
                                                                    style={{ width: "100%", height: "100%" }}
                                                                />
                                                            </IconButton>
                                                        </Link>

                                                        <CopyToClipboard
                                                            text={selectedTransaction.txHash}
                                                            onCopy={() => setTxCopied(true)}
                                                        >
                                                            <Tooltip
                                                                title={
                                                                    txCopied ? (
                                                                        <Typography variant="caption" color="text.success">
                                                                            TxID copied!
                                                                        </Typography>
                                                                    ) : (
                                                                        "Copiar"
                                                                    )
                                                                }
                                                                TransitionComponent={Zoom}
                                                            >
                                                                <IconButton>
                                                                    <img
                                                                        src={CopyIcon}
                                                                        alt="copiar"
                                                                        style={{ width: "100%", height: "100%" }}
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </CopyToClipboard>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        : <></>
                                }
                            </Box>
                            : <></>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    )

}