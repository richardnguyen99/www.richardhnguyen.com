import ExternalLink from "../external-link";
import { type GlossaryContextType } from "./types";

export const defaultTerms: GlossaryContextType["terms"] = {
  mss: (
    <p>
      Maximum Segment Size. Specify the largest amount of data in bytes can be
      received in a single TCP segment.
    </p>
  ),
  "connection-mode": (
    <p>
      Connection-oriented (or connection-mode) in which two TCP ends establish a
      reliable connection before sending data.
    </p>
  ),
  "stream-byte": (
    <p>
      A byte stream treats a file as a sequence of bytes that could be
      transmitted in multiple packets instead of a single one.
    </p>
  ),
  tcp: (
    <p>
      Transmission Control Protocol. A connection-oriented, reliable protocol in
      Transport Layer of the OSI model.
    </p>
  ),
  udp: (
    <p>
      User Datagram Protocol. A connectionless, unreliable protocol in Transport
      Layer of the OSI model.
    </p>
  ),

  http: (
    <p>
      Hyper-Text Transfer Protocol. An application-layer protocol for
      transmitting files over TCP. Defined at{" "}
      <ExternalLink href="https://datatracker.ietf.org/doc/html/rfc1945">
        RFC 1945
      </ExternalLink>
      .
    </p>
  ),

  "http/1.1": (
    <p>
      Hyper-Text Transfer Protocol version 1.1. A widely used version of HTTP
      that supports persistent connections and pipelining. Defined at{" "}
      <ExternalLink href="https://datatracker.ietf.org/doc/html/rfc2616">
        RFC 2616
      </ExternalLink>
      .
    </p>
  ),

  "http/2": (
    <p>
      Hyper-Text Transfer Protocol version 2. A major revision of HTTP that
      solves the Head-Of-Line Blocking problem in HTTP/1.1. Defined at{" "}
      <ExternalLink href="https://datatracker.ietf.org/doc/html/rfc7540">
        RFC 7540
      </ExternalLink>
      and{" "}
      <ExternalLink href="https://datatracker.ietf.org/doc/html/rfc9113">
        RFC 9113
      </ExternalLink>
      .
    </p>
  ),

  https: (
    <p>
      HTTP Over TLS. A secure version of HTTP that encrypts the data transmitted
      between the client and the server. Defined at{" "}
      <ExternalLink href="https://datatracker.ietf.org/doc/html/rfc2818">
        RFC 2818
      </ExternalLink>
      .
    </p>
  ),

  ftp: (
    <p>
      File Transfer Protocol. A standard network protocol used to promote
      sharing of files between a client and a server on a computer network in a
      reliable and secure manner. Defined at{" "}
      <ExternalLink href="https://datatracker.ietf.org/doc/html/rfc959">
        RFC 959
      </ExternalLink>
      .
    </p>
  ),

  smtp: (
    <p>
      Simple Mail Transfer Protocol. A communication protocol for electronic
      mail transmission. Defined at{" "}
      <ExternalLink href="https://datatracker.ietf.org/doc/html/rfc5321">
        RFC 5321
      </ExternalLink>
      .
    </p>
  ),

  "logical-communication": (
    <p>
      Describe a digital communicating connection between two ends without
      worrying about the intermediate systems and the physical medium.
    </p>
  ),

  "transport-layer": (
    <p>
      The fourth layer of the OSI model that provides end-to-end logical
      communication between two application processes, either on the same host
      or on different hosts.
    </p>
  ),

  "network-layer": (
    <p>
      The third layer of the OSI model that provides end-to-end logical
      communication between two hosts.
    </p>
  ),

  "application-layer": (
    <p>
      The top layer of the OSI model that provides services directly to the end
      users. For example: HTTP, FTP, SMTP, DNS, etc.
    </p>
  ),

  "sequence-number": (
    <p>
      A sequence number is a unique number assigned to each byte in a TCP
      connection. It helps the receiver to reassemble the data in the correct
      order.
    </p>
  ),

  segment: (
    <p>
      A segment is a data unit, or TCP packet that is transmitted between two
      hosts in a TCP connection. A file can be divided into multiple segments
      and transmitted over the network.
    </p>
  ),

  "ip-protocol": (
    <p>
      Internet Protocol. A network-layer protocol that provides logical
      communication between hosts.
    </p>
  ),

  "flow-control": (
    <p>
      A TCP mechanism to prevent the sender from overwhelming the receiver by
      sending too much data too fast.
    </p>
  ),

  "congestion-control": (
    <p>
      A TCP mechanism that detects and handles congestion in the network to
      prevent the network from being overwhelmed and losing packets.
    </p>
  ),
};
