#!/usr/bin/perl

my $url = $ARGV[0];
my $loc = `preview renderV2 --verbose --verbose localhost:8080 --template video $url 2>&1`;

$loc =~ /{"Key":"streamingUrl","Value":\["(.+)"\]/;
$loc = $1;
open(my $fh, '>', "source.json");
print $fh '{"source":"' . $loc . '"}';
close($fh);
