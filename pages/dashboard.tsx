import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {usePrivy, useWallets} from '@privy-io/react-auth';
import Head from 'next/head';

export default function DashboardPage() {
    const router = useRouter();
    const {
        ready,
        authenticated,
        user,
        logout,
        linkEmail,
        linkWallet,
        unlinkEmail,
        linkPhone,
        unlinkPhone,
        unlinkWallet,
        linkGoogle,
        unlinkGoogle,
        linkTwitter,
        unlinkTwitter,
        linkDiscord,
        unlinkDiscord,
        exportWallet,
        connectWallet
    } = usePrivy();
    const {wallets} = useWallets();

    useEffect(() => {
        if (ready && !authenticated) {
            router.push('/');
        }
    }, [ready, authenticated, router]);

    const numAccounts = user ?. linkedAccounts ?. length || 0;
    const canRemoveAccount = numAccounts > 1;

    const email = user ?. email;
    const phone = user ?. phone;
    const wallet = user ?. wallet;
    const hasEmbeddedWallet = !!user ?. linkedAccounts.find((account) => (account.type === 'wallet' && account.walletClient === 'privy'));

    const googleSubject = user ?. google ?. subject || null;
    const twitterSubject = user ?. twitter ?. subject || null;
    const discordSubject = user ?. discord ?. subject || null;

    return (
        <>
            <Head>
                <title>Privy Auth Demo</title>
            </Head>

            <main className="flex flex-col min-h-screen px-4 py-6 sm:px-20 sm:py-10 bg-privy-light-blue">
                {
                ready && authenticated ? (
                    <>
                        <div className="flex flex-row justify-between">
                            <h1 className="text-2xl font-semibold">Privy Auth Demo</h1>
                            <button onClick={logout}
                                className="px-4 py-2 text-sm rounded-md bg-violet-200 hover:text-violet-900 text-violet-700">
                                Logout
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-12">
                            {
                            googleSubject ? (
                                <button onClick={
                                        () => {
                                            unlinkGoogle(googleSubject);
                                        }
                                    }
                                    className="px-4 py-2 text-sm border rounded-md border-violet-600 hover:border-violet-700 text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                                    disabled={
                                        ! canRemoveAccount
                                }>
                                    Unlink Google
                                </button>
                            ) : (
                                <button onClick={
                                        () => {
                                            linkGoogle();
                                        }
                                    }
                                    className="px-4 py-2 text-sm text-white rounded-md bg-violet-600 hover:bg-violet-700">
                                    Link Google
                                </button>
                            )
                        }

                            {
                            twitterSubject ? (
                                <button onClick={
                                        () => {
                                            unlinkTwitter(twitterSubject);
                                        }
                                    }
                                    className="px-4 py-2 text-sm border rounded-md border-violet-600 hover:border-violet-700 text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                                    disabled={
                                        ! canRemoveAccount
                                }>
                                    Unlink Twitter
                                </button>
                            ) : (
                                <button className="px-4 py-2 text-sm text-white rounded-md bg-violet-600 hover:bg-violet-700"
                                    onClick={
                                        () => {
                                            linkTwitter();
                                        }
                                }>
                                    Link Twitter
                                </button>
                            )
                        }

                            {
                            discordSubject ? (
                                <button onClick={
                                        () => {
                                            unlinkDiscord(discordSubject);
                                        }
                                    }
                                    className="px-4 py-2 text-sm border rounded-md border-violet-600 hover:border-violet-700 text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                                    disabled={
                                        ! canRemoveAccount
                                }>
                                    Unlink Discord
                                </button>
                            ) : (
                                <button className="px-4 py-2 text-sm text-white rounded-md bg-violet-600 hover:bg-violet-700"
                                    onClick={
                                        () => {
                                            linkDiscord();
                                        }
                                }>
                                    Link Discord
                                </button>
                            )
                        }

                            {
                            email ? (
                                <button onClick={
                                        () => {
                                            unlinkEmail(email.address);
                                        }
                                    }
                                    className="px-4 py-2 text-sm border rounded-md border-violet-600 hover:border-violet-700 text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                                    disabled={
                                        ! canRemoveAccount
                                }>
                                    Unlink email
                                </button>
                            ) : (
                                <button onClick={linkEmail}
                                    className="px-4 py-2 text-sm text-white rounded-md bg-violet-600 hover:bg-violet-700">
                                    Connect email
                                </button>
                            )
                        }
                            {
                            wallet ? (
                                <button onClick={
                                        () => {
                                            unlinkWallet(wallet.address);
                                        }
                                    }
                                    className="px-4 py-2 text-sm border rounded-md border-violet-600 hover:border-violet-700 text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                                    disabled={
                                        ! canRemoveAccount
                                }>
                                    Unlink wallet
                                </button>
                            ) : (
                                <button onClick={linkWallet}
                                    className="px-4 py-2 text-sm text-white border-none rounded-md bg-violet-600 hover:bg-violet-700">
                                    Connect wallet
                                </button>
                            )
                        }
                            {
                            wallet && hasEmbeddedWallet ? (
                                <button onClick={exportWallet}
                                    disabled={
                                        !(ready && authenticated) || ! hasEmbeddedWallet
                                    }
                                    className="px-4 py-2 text-sm text-white border-none rounded-md bg-violet-600 hover:bg-violet-700">
                                    Export wallet Private Keys
                                </button>
                            ) : (
                                <button onClick={exportWallet}
                                    className="px-4 py-2 text-sm border rounded-md border-violet-600 hover:border-violet-700 text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500">
                                    Export wallet Private Keys
                                </button>
                            )
                        }
                            {
                            wallet ? (
                                <div>
                                    <button onClick={connectWallet}

                                        className="px-4 py-2 text-sm text-white border-none rounded-md bg-violet-600 hover:bg-violet-700">
                                        Connect external wallet
                                    </button>
                                    <button onClick={
                                            () => wallets[0] ?. loginOrLink()
                                        }
                                        disabled={
                                            !wallets[0] || wallets[0].linked
                                        }
                                        className="px-4 py-2 text-sm text-white border-none rounded-md bg-violet-600 hover:bg-violet-700">
                                        Link</button>
                                </div>
                            ) : (
                                <button onClick={connectWallet}
                                    className="px-4 py-2 text-sm border rounded-md border-violet-600 hover:border-violet-700 text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500">
                                    Connect external wallet
                                </button>
                            )
                        }
                            {
                            phone ? (
                                <button onClick={
                                        () => {
                                            unlinkPhone(phone.number);
                                        }
                                    }
                                    className="px-4 py-2 text-sm border rounded-md border-violet-600 hover:border-violet-700 text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
                                    disabled={
                                        ! canRemoveAccount
                                }>
                                    Unlink phone
                                </button>
                            ) : (
                                <button onClick={linkPhone}
                                    className="px-4 py-2 text-sm text-white border-none rounded-md bg-violet-600 hover:bg-violet-700">
                                    Connect phone
                                </button>
                            )
                        } </div>

                        <p className="mt-6 text-sm font-bold text-gray-600 uppercase">User object</p>
                        <textarea value={
                                JSON.stringify(user, null, 2)
                            }
                            className="max-w-4xl p-4 mt-2 font-mono text-xs rounded-md bg-slate-700 text-slate-50 sm:text-sm"
                            rows={20}
                            disabled/>
                    </>
                ) : null
            } </main>
        </>
    );
}
